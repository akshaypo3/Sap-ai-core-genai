import { useState } from "react";
import AssignedUserDropdown from "./AssignedUserForm";
import { AddAssignedUser } from "@/components/materiality/assessments/buttons";
import { addIroUserTask } from "@/lib/assessments/action";
import { TableCell } from "@/components/ui/table";

export function IroUserComponent({
  users,
  items,
  userId,
  handleUserAdded
}: {
  users: any;
  items: any;
  userId: any;
  handleUserAdded: (message: string) => void;
}) {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  const handleUserSelect = (userId: string) => {
    setSelectedUser(userId);
  };

  const handleFormSubmit = async () => {
    if (!selectedUser) {
      return;
    }

    const formData = new FormData();
    formData.append("title", items.topic);
    formData.append("description", items.sub_topic);
    formData.append("created_by", userId);
    formData.append("assessmentId", items.assessment_id);
    formData.append("iroId", items.id);
    // formData.append("start_date", items.created_at);
    formData.append("status", "TODO");
    formData.append("assigned_to", selectedUser);

    const toastDisplayUser = users.find(
      (user: any) => user.id === selectedUser,
    );

    setIsButtonDisabled(true);

    await addIroUserTask(formData);
    handleUserAdded(
      `User "${toastDisplayUser?.username || "User"}" and Task "${
        items.topic
      }" added successfully!`,
    );
  };

  return (
    <>
      <TableCell>
        <AssignedUserDropdown
          users={users}
          items={items}
          userId={userId}
          onUserSelect={handleUserSelect}
        />
      </TableCell>
      <TableCell>
        <AddAssignedUser
          onSubmit={handleFormSubmit}
          disabled={isButtonDisabled || !selectedUser}
        />
      </TableCell>
    </>
  );
}
