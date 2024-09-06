import { Trash2 } from "lucide-react";
import { deleteGroup } from "@/lib/settings/users/action";

export async function DeleteGroupButton({ id }: { id: string }) {
  const deleteGroupWithId = deleteGroup.bind(null, id);

  return (
    <form action={deleteGroupWithId}>
      <button
        type="submit"
        className="px-2 bg-red-600 h-7 hover:bg-red-900 rounded-md"
      >
        <Trash2 className="w-4 text-white" />
      </button>
    </form>
  );
}