"use server";

const cron = require("node-cron");
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { sendMail } from "@/lib/settings/smtp/action";
import { getUserInfo } from "@/lib/settings/users/data";
import { getTimeZone } from "@/lib/settings/timezone/action";

export async function createTask(formData: FormData) {
  const supabase = createClient();
  const userData = await getUserInfo();
  const userEmail = userData.email;
  const userName = userEmail.substring(0, userEmail.indexOf("@"));

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

    if (!error && data) {
      const taskId = data[0]?.id;
      const { error: logError } = await supabase
        .from("task-activitylog")
        .insert({
          created_at: new Date().toISOString(),
          activity: `Task '${title}' created`,
          user: userName,
          changes: {
            user: userName,
            activity: `Task '${title}' created`,
            created_at: new Date().toISOString(),
            title: title,
            description: description,
            assigned_to: assigned_to,
            created_by: created_by,
            status: status,
            start_date: start_date,
            due_date: due_date,
          },
          task_id : taskId
        });

      if (logError) {
        console.error("Error inserting into task-activitylog:", logError);
      }
    }

    const { data: createdUserData, error: createdUserError } = await supabase
      .from("user_profile")
      .select("userEmail")
      .eq("id", created_by)
      .single();

    if (createdUserError || !createdUserData) {
      throw new Error("Error fetching created user's email");
    }

    const { data: notificationData, error: notificationDataError } = await supabase
    .from("notifications")
    .insert({
      user_id :created_by,
      name : userName,
      message : `'${title}' has been assigned to you`,
      type: "task",
      link: `/task/${data[0]?.id}`
      // archived
    })

    if(notificationDataError){
      console.error("Error while adding notification");
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
  const userData = await getUserInfo();
  const userEmail = userData.email;
  const userName = userEmail.substring(0, userEmail.indexOf("@"));

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
    const { data: currentTask, error: fetchError } = await supabase
      .from("tasks")
      .select()
      .eq("id", id)
      .single();

    if (fetchError) {
      console.error("Error fetching current task data:", fetchError);
      return;
    }

    const updatedFields: any = {};
    for (const key in updatedData) {
      if (String(updatedData[key]) !== String(currentTask[key])) {
        updatedFields[key] = {
          previous: currentTask[key] || "N/A",
          updated: updatedData[key] || "N/A",
        };
      }
    }

    if (Object.keys(updatedFields).length === 0) {
      console.log("No fields were updated.");
      return;
    }

    const { data, error: updateError } = await supabase
      .from("tasks")
      .update(updatedData)
      .eq("id", id);

    if (updateError) {
      console.error("Error updating task:", updateError);
      throw new Error("Failed to update task");
    }

    if (!updateError) {
      const { error: logError } = await supabase
        .from("task-activitylog")
        .insert({
          created_at: new Date().toISOString(),
          activity: `Task '${updatedData?.title}' updated`,
          user: userName,
          changes: updatedFields,
          task_id : id,
        });

      if (logError) {
        console.error("Error inserting into task-activitylog:", logError);
      }
    }
  } catch (error) {
    console.error("Error in updateTask function:", error);
  } finally {
    revalidatePath(`/task/${id}`);
    redirect(`/task/${id}`);
  }
}


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


export async function updateTaskStatus(taskId: string, newStatus: string) {
  const supabase = createClient();
  console.log("updateTaskStatus triggered");

  let updatedData: any = {
    status: newStatus,
    updated_at: new Date().toISOString(),
  };

  if (newStatus === "DONE") {
    updatedData.completed_date = new Date().toISOString();
  } else {
    updatedData.completed_date = null;
  }

  

  try {
    const { data, error } = await supabase
      .from("tasks")
      .update(updatedData)
      .eq("id", taskId)
      .select();

    if (error) {
      console.error("Error updating task status:", error);
      throw new Error("Failed to update task status");
    }

    return data?.[0];
  } catch (error) {
    console.error("Error in updateTaskStatus function:", error);
    throw error;
  }
}

export const createComment = async (formData: FormData) => {
  const supabase = createClient();
  const userData = await getUserInfo();
  const userEmail = userData.email;
  const userName = userEmail.substring(0, userEmail.indexOf("@"));
  const userId = userData.id;

  const taskID = formData.get("taskID");
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
      user_id: userId,
    });

    if (error) {
      console.error("Error creating comment:", error);
      return null;
    }

    if (!error) {
      const { error: logError } = await supabase
        .from("task-activitylog")
        .insert({
          created_at: new Date().toISOString(),
          activity: `Comment '${commentText}' created`,
          user: userName,
          task_id : taskID
        });

      if (logError) {
        console.error("Error inserting into task-activitylog:", logError);
      }
    }

    return newComment;
  } catch (error) {
    console.error("Error creating comment:", error);
    return null;
  } finally {
    revalidatePath(`/task/${taskID}`);
    redirect(`/task/${taskID}`);
  }
};

export const createCommentDialog = async (formData: FormData) => {
  const supabase = createClient();
  const userData = await getUserInfo();
  const userEmail = userData.email;
  const userName = userEmail.substring(0, userEmail.indexOf("@"));
  const userId = userData.id;

  const taskID = formData.get("taskID");
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
      user_id: userId,
    });

    if (error) {
      console.error("Error creating comment:", error);
      return null;
    }

    if (!error) {
      const { error: logError } = await supabase
        .from("task-activitylog")
        .insert({
          created_at: new Date().toISOString(),
          activity: `Comment '${commentText}' created`,
          user: userName,
          task_id : taskID
        });

      if (logError) {
        console.error("Error inserting into task-activitylog:", logError);
      }
    }

    return newComment;
  } catch (error) {
    console.error("Error creating comment:", error);
    return null;
  } finally {
    revalidatePath(`/task/`);
    redirect(`/task/`);
  }
};

export const deleteComment = async (commentId: string, taskId: string) => {
  const supabase = createClient();
  const userData = await getUserInfo();
  const userEmail = userData.email;
  const userName = userEmail.substring(0, userEmail.indexOf("@"));

  try {
    const { data: previousData, error: fetchError } = await supabase
      .from("comments")
      .select()
      .eq("id", commentId)
      .single();

      

    if (fetchError) {
      console.error("Error fetching comment:", fetchError);
      return null;
    }

    const { data, error } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId);

    if (error) {
      console.error("Error deleting comment:", error);
      return null;
    }

    if (!error) {
      const { error: logError } = await supabase
        .from("task-activitylog")
        .insert({
          created_at: new Date().toISOString(),
          activity: `Comment '${previousData.comment}' deleted`,
          user: userName,
          task_id : taskId
        });

      if (logError) {
        console.error("Error inserting into task-activitylog:", logError);
      }
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
    return null;
  } finally {
    
    revalidatePath(`/task/${taskId}`);
    redirect(`/task/${taskId}`);
  }
};

export const deleteCommentDialog = async (commentId: string, taskId: string) => {
  const supabase = createClient();
  const userData = await getUserInfo();
  const userEmail = userData.email;
  const userName = userEmail.substring(0, userEmail.indexOf("@"));

  try {
    const { data: previousData, error: fetchError } = await supabase
      .from("comments")
      .select()
      .eq("id", commentId)
      .single();

      

    if (fetchError) {
      console.error("Error fetching comment:", fetchError);
      return null;
    }

    const { data, error } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId);

    if (error) {
      console.error("Error deleting comment:", error);
      return null;
    }

    if (!error) {
      const { error: logError } = await supabase
        .from("task-activitylog")
        .insert({
          created_at: new Date().toISOString(),
          activity: `Comment '${previousData.comment}' deleted`,
          user: userName,
          task_id : taskId
        });

      if (logError) {
        console.error("Error inserting into task-activitylog:", logError);
      }
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
    return null;
  } finally {
    revalidatePath(`/task/`);
    redirect(`/task/`);
  }
};

export async function deleteTaskWithId(id:string) {
  let taskId = id;
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId)
      .select();

    if (error) {
      throw new Error(`Failed to delete task: ${error.message}`);
    }

    if (data === null) {
      console.warn(`No taskId found with id: ${id}`);
    }

    console.log(`Successfully deleted taskId with id: ${id}`);

    revalidatePath("/task");
    // return { success: true, message: "taskId deleted successfully" };

  } catch (error) {
    console.error("Error deleting taskId:", error.message);
    return { success: false, message: error.message };
  }
}

export async function ArchiveTaskWithId(id: string) {
  const supabase = createClient();
  const userData = await getUserInfo();
  const userEmail = userData.email;
  const userName = userEmail.substring(0, userEmail.indexOf("@"));

  const taskId = id;

  const updatedData = {
    archived: true,
    status: "DONE",
    updated_at: new Date().toISOString(),
    completed_date: new Date().toISOString(),
  };

  try {
    // Fetch current task data to compare and log changes
    const { data: currentTask, error: fetchError } = await supabase
      .from("tasks")
      .select()
      .eq("id", taskId)
      .single();

    if (fetchError) {
      console.error("Error fetching current task data:", fetchError);
      return { success: false, message: fetchError.message };
    }

    const updatedFields: any = {};
    for (const key in updatedData) {
      if (String(updatedData[key]) !== String(currentTask[key])) {
        updatedFields[key] = {
          previous: currentTask[key] || "N/A",
          updated: updatedData[key] || "N/A",
        };
      }
    }

    if (Object.keys(updatedFields).length === 0) {
      console.log("No changes to update.");
      return { success: false, message: "No changes to update." };
    }

    // Update the task status to archived
    const { data, error: updateError } = await supabase
      .from("tasks")
      .update(updatedData)
      .eq("id", taskId);

    if (updateError) {
      console.error("Error updating task:", updateError);
      throw new Error("Failed to update task");
    }

    // Log the activity in the task-activitylog table
    if (!updateError) {
      const { error: logError } = await supabase
        .from("task-activitylog")
        .insert({
          created_at: new Date().toISOString(),
          activity: `Task '${updatedData?.status}' status and archived`,
          user: userName,
          changes: updatedFields,
          task_id: taskId,
        });

      if (logError) {
        console.error("Error inserting into task-activitylog:", logError);
      }
    }

    return { success: true, message: "Task archived and updated successfully" };

  } catch (error) {
    console.error("Error archiving task:", error.message);
    return { success: false, message: error.message };
  }
  finally {
    revalidatePath("/task");
    redirect("/task");
  }
}


export async function updateTaskDetails(taskId, formData) {
  const supabase = createClient();
  const userData = await getUserInfo();
  const userEmail = userData.email;
  const userName = userEmail.substring(0, userEmail.indexOf("@"));

  const id = taskId
  

  const updatedData = {
    description: formData.get("description"),
    assigned_to: formData.get("assigned_to"),
    title: formData.get("title"),
    updated_at: new Date().toISOString(),
  };

  try {
    const { data: currentTask, error: fetchError } = await supabase
      .from("tasks")
      .select()
      .eq("id", id)
      .single();

    if (fetchError) {
      console.error("Error fetching current task data:", fetchError);
      return;
    }

    const updatedFields: any = {};
    for (const key in updatedData) {
      if (String(updatedData[key]) !== String(currentTask[key])) {
        updatedFields[key] = {
          previous: currentTask[key] || "N/A",
          updated: updatedData[key] || "N/A",
        };
      }
    }

    if (Object.keys(updatedFields).length === 0) {
      console.log("No fields were updated.");
      return;
    }

    const { data, error: updateError } = await supabase
      .from("tasks")
      .update(updatedData)
      .eq("id", id);

    if (updateError) {
      console.error("Error updating task:", updateError);
      throw new Error("Failed to update task");
    }

    if (!updateError) {
      const { error: logError } = await supabase
        .from("task-activitylog")
        .insert({
          created_at: new Date().toISOString(),
          activity: `Task '${updatedData?.title}' updated`,
          user: userName,
          changes: updatedFields,
          task_id : id,
        });

      if (logError) {
        console.error("Error inserting into task-activitylog:", logError);
      }
    }
  } catch (error) {
    console.error("Error in updateTask function:", error);
  } finally {
    revalidatePath("/task");
    redirect("/task");
  }
}


export async function getComments(taskId:string){
  const supabase = createClient();
  const userData = await getUserInfo();
  const timezone1 = await getTimeZone({ userId: userData.id })
  const userId=userData.id;
  const timezone = timezone1.userWithTimezone?.timezone || "UTC";


  const { data: comments, error } = await supabase
  .from("comments")
  .select()
  .order('created_at', { ascending: false })
  .eq("task_id", taskId);

  if (error) {
    console.error("Error fetching comments:", error);
    return null;
  }
  const result = {
    comments,
    timezone,
    userId
  };

  return result;
}

export async function getTaskLogs(taskId:string){
  const supabase = createClient();

  const { data: tasklogs, error } = await supabase
  .from("task-activitylog")
  .select()
  .order('created_at', { ascending: false })
  .eq("task_id", taskId);

  if (error) {
    console.error("Error fetching task logs:", error);
    return null;
  }

  return tasklogs;
}