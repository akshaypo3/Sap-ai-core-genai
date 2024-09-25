"use server";

const cron = require("node-cron");
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { sendMail } from "@/lib/settings/smtp/action";
import { getUserInfo } from "@/lib/settings/users/data";

export async function createTask(formData: FormData) {
  const supabase = createClient();
  // const userData = await getUserInfo();
  // const userEmail= userData.email;
  // const userName = userEmail.substring(0, userEmail.indexOf('@'));

  const title = formData.get("title");
  const description = formData.get("description");
  const assigned_to = formData.get("assigned_to");
  const created_by = formData.get("created_by");
  const status = formData.get("status") || "TODO";
  const start_date = formData.get("start_date");
  const due_date = formData.get("due_date");

  try {
    const { data, error } = await supabase
      .from("tasks")
      .insert({
        title: title,
        description: description,
        assigned_to: assigned_to,
        created_by: created_by,
        status: status,
        start_date: start_date,
        due_date: due_date,
      })
      .select();

    if (error) {
      throw new Error("Error while inserting in the database");
    }

    // if (!error && data) {
    //   await supabase.from("activitylog").insert({
    //     created_at: new Date().toISOString(),
    //     activity: `Group '${groupName}' created`,
    //   //   user:userName,
    //   });
    // }

    const { data: createdUserData, error: createdUserError } = await supabase
      .from("user_profile")
      .select("userEmail")
      .eq("id", created_by)
      .single();

    if (createdUserError || !createdUserData) {
      throw new Error("Error fetching created user's email");
    }

    const createdUserEmail = createdUserData.userEmail;

    const createdEmailDetails = {
      to: createdUserEmail,
      subject: "SMTP Test Mail",
      text: "MTP Test Mail",
      html: `<p><strong>SMTP Test successful</strong>
       <p>Click <a href="http://localhost:3000/task" target="_blank">here</a> to go for tasks.</p>`,
    };

    const createdEmailResponse = await sendMail(createdEmailDetails);
    if (!createdEmailResponse) {
      console.error("Error sending email notification to created user");
    }

    if (created_by !== assigned_to) {
      const { data: assignedUserData, error: assignedUserError } =
        await supabase
          .from("user_profile")
          .select("userEmail")
          .eq("id", assigned_to)
          .single();

      if (assignedUserError || !assignedUserData) {
        throw new Error("Error fetching assigned user's email");
      }

      const assignedUserEmail = assignedUserData.userEmail;

      const assignedEmailDetails = {
        to: assignedUserEmail,
        subject: "SMTP Test Mail",
        text: "MTP Test Mail",
        html: `<p><strong>SMTP Test successful</strong>
        <p>Click <a href="http://localhost:3000/task" target="_blank">here</a> to go for tasks.</p>`,
      };

      const assignedEmailResponse = await sendMail(assignedEmailDetails);
      if (!assignedEmailResponse) {
        console.error("Error sending email notification to assigned user");
      }
    }
  } catch (error) {
    console.error("Error while adding task:", error);
  } finally {
    revalidatePath("/task");
    redirect("/task");
  }
}

export async function updateTask(formData: FormData) {
  const supabase = createClient();

  const id = formData.get("id");

  const updatedData = {
    title: formData.get("title"),
    description: formData.get("description"),
    assigned_to: formData.get("assigned_to"),
    status: formData.get("status"),
    start_date: formData.get("start_date"),
    due_date: formData.get("due_date"),
    updated_at: new Date().toISOString(),
  };

  try {
    const { data, error } = await supabase
      .from("tasks")
      .update(updatedData)
      .eq("id", id);

    if (error) {
      console.error("Error updating task:", error);
      throw new Error("Failed to update task");
    }
  } catch (error) {
    console.error("Error in updateTask function:", error);
  } finally {
    revalidatePath("/task");
    redirect("/task");
  }
}

export const updateTaskStatus = async (taskId: any, newStatus: any) => {
  const supabase = createClient();
  const { data: updatatedtasks, error } = await supabase
    .from("tasks")
    .update({ status: newStatus })
    .eq("id", taskId);

  if (error) {
    console.error("Error updating task status:", error);
  }

  return updatatedtasks;
};

cron.schedule("8 8 * * *", async () => {
  const supabase = createClient();

  try {
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];

    const { data: overdueTasks, error } = await supabase
      .from("tasks")
      .select("id, assigned_to, title, due_date")
      .lt("due_date", todayString)
      .neq("status", "DONE");

    if (error) {
      throw new Error("Error fetching data from the database");
    }

    if (overdueTasks.length > 0) {
      const tasksByUser = overdueTasks.reduce(
        (acc: { [key: string]: any[] }, task) => {
          if (!acc[task.assigned_to]) {
            acc[task.assigned_to] = [];
          }
          acc[task.assigned_to].push(task);
          return acc;
        },
        {},
      );

      for (const [assigned_to, tasks] of Object.entries(tasksByUser)) {
        if (tasks.length >= 50) {
          const { data: userData, error: userError } = await supabase
            .from("user_profile")
            .select("userEmail")
            .eq("id", assigned_to)
            .single();

          if (userError || !userData) {
            console.error("Error fetching assigned user email", userError);
            continue;
          }

          const userEmail = userData.userEmail;

          const taskListHtml = tasks
            .map(
              (task) =>
                `<li>${task.title} (due on ${new Date(
                  task.due_date,
                ).toLocaleDateString()})</li>`,
            )
            .join("");

          const emailDetails = {
            to: userEmail,
            subject: `You have ${tasks.length} overdue tasks`,
            text: `You have ${tasks.length} overdue tasks.`,
            html: `<p>You have ${tasks.length} overdue tasks:</p><ul>${taskListHtml}</ul>
                   <p>Click <a href="http://localhost:3000/task" target="_blank">here</a> to view your tasks.</p>`,
          };

          const emailResponse = await sendMail(emailDetails);
          if (!emailResponse) {
            console.error(
              "Error sending overdue notification email to",
              userEmail,
            );
          }
        } else {
          console.log(`User ${assigned_to} has fewer than 50 overdue tasks`);
        }
      }
    } else {
      console.log("No overdue tasks found");
    }
  } catch (error) {
    console.error("Error in cron job:", error);
  }
});

export const createComment = async (formData: FormData) => {
  const supabase = createClient();
  const userData = await getUserInfo();
  const userEmail = userData.email;
  const userName = userEmail.substring(0, userEmail.indexOf("@"));
  const userId = userData.id;

  const taskID = formData.get("taskID")
  const commentText = formData.get("comment");

  if (!commentText) {
    console.error("Comment cannot be empty");
    return null;
  }

  try {
    const { data: newComment, error } = await supabase.from("comments").insert({
      comment: commentText,
      user: userName,
      task_id: taskID,
      user_id: userId
    });

    if (error) {
      console.error("Error creating comment:", error);
      return null;
    }

    return newComment;
  } catch (error) {
    console.error("Error creating comment:", error);
    return null;
  } finally {
    revalidatePath(`/task/${taskID}`);
    redirect(`/task/${taskID}`); 
  }
}

export const deleteComment = async (commentId: string, taskId: string) => {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
    .from("comments")
    .delete()
    .eq("id",commentId);

    return data;

  } catch (error) {
    console.error("Error deleting comment:", error);
    return null;
  } finally {
    revalidatePath(`/task/${taskId}`);
    redirect(`/task/${taskId}`); 
  }
}
