
import { useEffect, useState, useTransition } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { getQuestionComments } from '@/lib/frameworks/action';
import { DeleteQuestionCommentButtonDialog } from './Buttons';
import { AddQuestionCommentButtonDialog } from './AddQuestionComment';
import { useTranslations } from 'next-intl';


export  function QuestionComments({ QuestionId,frameworkId,assessmentID,isOpen}) {


  const [isLoadingComments, startLoadingComments] = useTransition();
  const [comments1, setComments] = useState([]);
  const [timezone, settimezone] = useState([]);

  const fetchtherequireddata = async () => {
      startLoadingComments(async () => {
        try {
          const result = await getQuestionComments(QuestionId,assessmentID);
          setComments(result);
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
  
  const comments=comments1.comment;
  const timezone1=comments1.timezone
  const userId=comments1.userId
  const actualTime = timezone1 || "UTC";

  const t = useTranslations('reporting-com')
  return (
    <div className="w-full max-w-2xl">
      <h2 className="font-semibold text-xl">{t("fe_frameworks.Comments")}</h2>
      <AddQuestionCommentButtonDialog QuestionId={QuestionId} frameworkId={frameworkId} assessmentID={assessmentID} fetchtherequireddata={fetchtherequireddata}/>
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
              {userId === comment.user_id && (
                <div className="flex items-center gap-2">
                    <DeleteQuestionCommentButtonDialog commentId={comment} frameworkId={frameworkId} assessmentID={assessmentID} fetchtherequireddata={fetchtherequireddata}/>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
