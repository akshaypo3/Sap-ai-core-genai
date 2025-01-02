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
  FrameworkID: any
  handleUserAdded: (message: string) => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  // const [resetKey, setResetKey] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    const savedAssignments = JSON.parse(localStorage.getItem("userQuestionAssignments") || "{}");
    setSelectedUserId(savedAssignments[items.id] || null); 
  }, [items.id]);
  
  const handleUserChange = async (newSelectedUserId: string) => {
    if (!newSelectedUserId) return;

    const formData = new FormData(formRef.current as HTMLFormElement);
    formData.set("title", items.question_text);
    formData.set("description", items.help_text);
    formData.set("assessmentId", items.assessment_id);
    formData.set("frameworkId", FrameworkID);
    formData.set("created_by", userId);
    formData.set("status", "TODO");
    formData.set("assigned_to", newSelectedUserId);

    const selectedUser = users.find((user: any) => user.id === newSelectedUserId);

    await addIroUserTaskQuestion(formData);
    handleUserAdded(
      `User "${selectedUser?.username || "User"}" and Task "${
        items.question_text
      }" added successfully!`,
    );

    // setResetKey((prevKey) => prevKey + 1);
    const savedAssignments = JSON.parse(localStorage.getItem("userQuestionAssignments") || "{}");
    savedAssignments[items.id] = newSelectedUserId;
    localStorage.setItem("userQuestionAssignments", JSON.stringify(savedAssignments));

    setSelectedUserId(newSelectedUserId);
  };

  return (
    <form ref={formRef}>
      <Input type="hidden" name="title" value={items.question_text} />
      <Input type="hidden" name="description" value={items.help_text} />
      <Input type="hidden" name="assessmentId" value={items.assessment_id} />
      <Input type="hidden" name="frameworkId" value={FrameworkID} />
      <Input type="hidden" name="created_by" value={userId} />
      {/* <Input type="hidden" name="start_date" value={items.created_at}/> */}
      <Input type="hidden" name="status" value="TODO" />
      <div className="w-[150px] mx-auto cursor-pointer">
        <Select
          name="assigned_to"
          // key={resetKey}
          value={selectedUserId || ""}
          onValueChange={(value) => handleUserChange(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder={
                selectedUserId
                  ? users.find((user: any) => user.id === selectedUserId)
                      ?.username || "NA"
                  : "Select User"
              }/>
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
