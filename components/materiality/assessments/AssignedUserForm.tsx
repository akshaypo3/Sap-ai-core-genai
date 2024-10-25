import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function AssignedUserDropdown({
  users,
  items,
  userId,
  onUserSelect,
}: {
  users: any;
  items: any;
  userId: any;
  onUserSelect: (selectedUser: string) => void;
}) {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const handleUserChange = (userId: string) => {
    setSelectedUser(userId);
    onUserSelect(userId);
  };

  return (
    <div>
      <Input type="hidden" name="title" value={items.topic} />
      <Input type="hidden" name="description" value={items.sub_topic} />
      <Input type="hidden" name="assessmentId" value={items.assessment_id} />
      <Input type="hidden" name="iroId" value={items.id} />
      <Input type="hidden" name="created_by" value={userId} />
      {/* <Input type="hidden" name="start_date" value={items.created_at}/> */}
      <Input type="hidden" name="status" value="TODO" />
      <div className="w-full">
        <Select name="assigned_to" onValueChange={handleUserChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select user" />
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
    </div>
  );
}
