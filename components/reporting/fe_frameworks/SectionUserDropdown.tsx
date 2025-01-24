import { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { addIroUserTaskQuestion } from "@/lib/assessments/action";

export default function SectionUserDropdown({
  users,
  section,
  userId,
  FrameworkID,
  handleUserAdded,
  handleSectionAssign,
}: {
  users: any;
  section: any;
  userId: any;
  FrameworkID: any;
  handleUserAdded: (message: string) => void;
  handleSectionAssign: (userId: string, section: any) => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  // Set selectedUserId based on section.assigned_to (if it changes)
  useEffect(() => {
    if (section.assigned_to !== selectedUserId) {
      setSelectedUserId(section.assigned_to || null); // Set to null if no assigned user
    }
  }, [section.assigned_to, selectedUserId]);

  const handleUserChange = async (newSelectedUserId: string) => {
    setSelectedUserId(newSelectedUserId);

    if (!newSelectedUserId) return; // Early return if no user is selected

    try {
      // Call the function to handle section-level assignment
      handleSectionAssign(newSelectedUserId, section);

      // Notify user of successful assignment
      handleUserAdded(`User "${newSelectedUserId}" assigned to section: ${section.code}`);
    } catch (error) {
      console.error("Error assigning user to section:", error);
      handleUserAdded("An error occurred while assigning the user.");
    }
  };

  return (
    <form ref={formRef}>
      <Input type="hidden" name="title" value={section.code} />
      <Input type="hidden" name="frameworkId" value={FrameworkID} />
      <Input type="hidden" name="created_by" value={userId} />

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
                  : "Assign User"
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
