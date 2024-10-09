import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getComments } from "@/lib/task/data";
import { formatDistanceToNow } from "date-fns";
import { DeleteCommentButton } from "./buttons";
import { AddCommentButton } from "./AddCommentButton";
import { getTimeZone } from "@/lib/settings/timezone/data";

export async function Comments({
  taskId,
  user,
}: {
  taskId: string;
  user: { id: string };
}) {
  const comments = await getComments(taskId);

  // const formatRelativeTime = (dateString: string) => {
  //   const date = new Date(dateString);
  //   return formatDistanceToNow(date, { addSuffix: true });
  // };

  const formatRelativeTime = (dateString: string, timeZone: string) => {
    const date = new Date(dateString);
    const dateInUserTimezone = new Date(date.toLocaleString("en-US", { timeZone }));
    return formatDistanceToNow(dateInUserTimezone, { addSuffix: true });
  };

  const timezone = await getTimeZone({ userId: user.id })
  const actualTime = timezone.userWithTimezone.timezone

  return (
    <div className="w-full max-w-2xl">
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
                  {formatRelativeTime(comment.created_at,actualTime)}
                </div>
              </div>
              <div className="mt-1">{comment.comment}</div>
              {user.id === comment.user_id && (
                <div className="flex items-center gap-2">
                  <DeleteCommentButton commentId={comment} taskId={taskId} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
