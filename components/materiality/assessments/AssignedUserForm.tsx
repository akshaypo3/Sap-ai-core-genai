import { useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { addIroUserTask } from "@/lib/assessments/action";

export default function AssignedUserDropdown({
  users,
  items,
  userId,
  handleUserAdded,
}: {
  users: any;
  items: any;
  userId: any;
  handleUserAdded: (message: string) => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [resetKey, setResetKey] = useState(0);

  const handleUserChange = async (selectedUserId: string) => {
    if (!selectedUserId) return;

    const formData = new FormData(formRef.current as HTMLFormElement);
    formData.set("title", items.topic);
    formData.set("description", items.sub_topic);
    formData.set("assessmentId", items.assessment_id);
    formData.set("iroId", items.id);
    formData.set("created_by", userId);
    formData.set("status", "TODO");
    formData.set("assigned_to", selectedUserId);

    const selectedUser = users.find((user: any) => user.id === selectedUserId);

    await addIroUserTask(formData);
    handleUserAdded(
      `User "${selectedUser?.username || "User"}" and Task "${
        items.topic
      }" added successfully!`,
    );

    setResetKey((prevKey) => prevKey + 1);
  };

  return (
    <form ref={formRef}>
      <Input type="hidden" name="title" value={items.topic} />
      <Input type="hidden" name="description" value={items.sub_topic} />
      <Input type="hidden" name="assessmentId" value={items.assessment_id} />
      <Input type="hidden" name="iroId" value={items.id} />
      <Input type="hidden" name="created_by" value={userId} />
      {/* <Input type="hidden" name="start_date" value={items.created_at}/> */}
      <Input type="hidden" name="status" value="TODO" />
      <div className="w-full">
        <Select
          name="assigned_to"
          key={resetKey}
          onValueChange={handleUserChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select User" />
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
