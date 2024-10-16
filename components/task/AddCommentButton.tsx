"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { createComment } from "@/lib/task/action";
import { useRef } from "react";
import { useTranslations } from "use-intl";


export function AddCommentButton({ taskId }: { taskId: string }) {
  const t = useTranslations("tasks-com")
  const ref = useRef<HTMLFormElement>(null);
  ref.current?.reset();

  return (
    <form ref={ref} action={createComment} className="grid gap-6 mb-3">
      <div className="w-full gap-1.5">
        <Label htmlFor="comment">{t("Add a comment")}</Label>
        <Textarea
          placeholder= {t("Type your comment here")}
          id="comment"
          name="comment"
          required
        />
        <Input type="hidden" value={taskId} name="taskID" />
        <Button size="sm" className="mt-3" type="submit">
          {t("Add Comment")}
        </Button>
      </div>
    </form>
  );
}
