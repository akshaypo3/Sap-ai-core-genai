import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { getComments } from "@/lib/task/data";
import { formatDistanceToNow } from "date-fns";
import { DeleteCommentButton } from "./buttons";
import { AddCommentButton } from "./buttons";

export async function Comments({
  taskId,
  user,
}: {
  taskId: string;
  user: { id: string };
}) {
  const comments = await getComments(taskId);

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="font-semibold text-xl">Comments</h2>
      <AddCommentButton taskId={taskId} />
      <div className="grid">
        {comments?.map((comment) => (
          <div
            className="flex items-start gap-4 p-4 border-b border-gray-200"
            key={comment.id}
          >
            <Avatar className="w-10 h-10 border">
              <AvatarImage src="/placeholder-user.jpg" alt="user" />
              <AvatarFallback>
                {comment.user.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div className="font-semibold">{comment.user}</div>
                <div className="text-gray-500 text-xs dark:text-gray-400">
                  {formatRelativeTime(comment.created_at)}
                </div>
              </div>
              <div className="mt-1">{comment.comment}</div>
              {user.id === comment.user_id && (
                <div className="flex items-center gap-2">
                  <DeleteCommentButton commentId={comment.id} taskId={taskId} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
