import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { addIroUserTaskQuestion } from "@/lib/assessments/action";

export default function AssignedUserDropdownQuestions({
  users,
  items,
  userId,
  handleUserAdded,
  FrameworkID,
}: {
  users: any;
  items: any;
  userId: any;
  FrameworkID: any;
  handleUserAdded: (message: string) => void;
}) {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // Sync the selectedUserId with items.assigned_to when the component is mounted or updated
  useEffect(() => {
    // Check if items.assigned_to has a value and update the state
    if (items.assigned_to && selectedUserId !== items.assigned_to) {
      setSelectedUserId(items.assigned_to);
    }
  }, [items.assigned_to, selectedUserId]); // Run this effect when assigned_to changes

  const handleUserChange = async (newSelectedUserId: string) => {
    setSelectedUserId(newSelectedUserId); // Update the state with the new user

    if (!newSelectedUserId) return; // Early return if no user is selected

    try {
      // Prepare form data to send
      const formData = new FormData();
      formData.set("id", items.id);
      formData.set("title", items.question_text);
      formData.set("description", items.help_text);
      formData.set("assessmentId", items.assessment_id);
      formData.set("frameworkId", FrameworkID);
      formData.set("created_by", userId);
      formData.set("status", "TODO");
      formData.set("assigned_to", newSelectedUserId);

      // Find the selected user from the users list
      const selectedUser = users.find((user: any) => user.id === newSelectedUserId);

      // Call the API to save the user-task assignment
      await addIroUserTaskQuestion(formData);

      // Notify user of successful assignment
      handleUserAdded(
        `User "${selectedUser?.username || "User"}" and Task "${
          items.question_text
        }" added successfully!`
      );
    } catch (error) {
      console.error("Error assigning user to task:", error);
      handleUserAdded("An error occurred while assigning the user.");
    }
  };

  return (
    <form>
      <Input type="hidden" name="title" value={items.question_text} />
      <Input type="hidden" name="description" value={items.help_text} />
      <Input type="hidden" name="assessmentId" value={items.assessment_id} />
      <Input type="hidden" name="frameworkId" value={FrameworkID} />
      <Input type="hidden" name="created_by" value={userId} />
      <Input type="hidden" name="status" value="TODO" />

      <div className="w-[150px] mx-auto cursor-pointer">
        <Select
          name="assigned_to"
          value={selectedUserId || ""} // Bind the value to selectedUserId
          onValueChange={(value) => handleUserChange(value)} // Update userId when changed
        >
          <SelectTrigger>
            <SelectValue
              placeholder={
                selectedUserId
                  ? users.find((user: any) => user.id === selectedUserId)?.username || "NA"
                  : "Select User"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {users?.map((user: any) => (
              <SelectItem key={user.id} value={user.id}>
                {user.username || "NA"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </form>
  );
}
