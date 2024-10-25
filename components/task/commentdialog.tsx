
import { useEffect, useState, useTransition } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getComments } from "@/lib/task/action";
import { formatDistanceToNow } from "date-fns";
import { DeleteCommentButton } from "./buttons";
import { AddCommentButton } from "./AddCommentButton";
import { getTimeZone } from "@/lib/settings/timezone/action";


export  function Comments({ taskId,isOpen}) {


  const [isLoadingComments, startLoadingComments] = useTransition();
  const [comments, setComments] = useState([]);
  const [timezone, settimezone] = useState([]);
  const user={
    id: '2b208744-654a-4be9-a215-6bbfc399d40f',
    aud: 'authenticated',
    role: 'authenticated',
    email: 'sathish.ks@vaspp.com',
    email_confirmed_at: '2024-09-18T09:03:23.299266Z',
    phone: '',
    confirmed_at: '2024-09-18T09:03:23.299266Z',
    last_sign_in_at: '2024-10-24T10:37:59.715515Z',
    app_metadata: { provider: 'email', providers: [ 'email' ] },
    user_metadata: { groups: 'Administrator', roles: 'Administrator' },
    identities: [
      {
        identity_id: '0929e77e-b09d-4ee8-bed4-b421e387cc1a',
        id: '2b208744-654a-4be9-a215-6bbfc399d40f',
        user_id: '2b208744-654a-4be9-a215-6bbfc399d40f',
        identity_data: [Object],
        provider: 'email',
        last_sign_in_at: '2024-09-18T09:03:23.293446Z',
        created_at: '2024-09-18T09:03:23.293527Z',
        updated_at: '2024-09-18T09:03:23.293527Z',
        email: 'sathish.ks@vaspp.com'
      }
    ],
    created_at: '2024-09-18T09:03:23.29099Z',
    updated_at: '2024-10-25T12:37:48.782632Z',
    is_anonymous: false
  }

  const fetchtherequireddata = async () => {
      startLoadingComments(async () => {
        try {
          const result = await getComments(taskId);
          
          setComments(result);
          //const timezone1 = await getTimeZone({ userId: user.id })
          //settimezone(timezone1);
          //console.log("comments"+timezone1);
        } catch (error) {
          console.error("Failed to fetch comments:", error);
        }
      });
  };

  useEffect(() => {
    fetchtherequireddata();
  }, [isOpen]); 

  const formatRelativeTime = (dateString: string, timeZone: string) => {
    const date = new Date(dateString);
    const dateInUserTimezone = new Date(date.toLocaleString("en-US", { timeZone }));
    return formatDistanceToNow(dateInUserTimezone, { addSuffix: true });
  };

  //const timezone = await getTimeZone({ userId: user.id })
  //const actualTime = timezone.userWithTimezone.timezone
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
                {/* <div className="text-gray-500 text-xs dark:text-gray-400">
                  {formatRelativeTime(comment.created_at,actualTime)}
                </div> */}
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
