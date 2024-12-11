"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createQuestionCommentDialog } from "@/lib/frameworks/action";

export function AddQuestionCommentButtonDialog({ QuestionId,frameworkId,assessmentID,fetchtherequireddata }: { QuestionId:string,frameworkId: string ,assessmentID:string}) {
    const ref = useRef<HTMLFormElement>(null);
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData(ref.current!);
      const newComment = await createQuestionCommentDialog(formData);
      ref.current?.reset();
      fetchtherequireddata(); 
    };
  
    return (
      <form ref={ref} onSubmit={handleSubmit} className="grid gap-6 mb-3">
        <div className="w-full gap-1.5">
          <Label htmlFor="comment">Add a comment</Label>
          <Textarea
            placeholder="Type your comment here."
            id="comment"
            name="comment"
            required
          />
          
          <Input type="hidden" value={QuestionId} name="QuestionId" />
          <Input type="hidden" value={frameworkId} name="frameworkId" />
          <Input type="hidden" value={assessmentID} name="assessmentID" />
          <Button size="sm" className="mt-3" type="submit">
            Add Comment
          </Button>
        </div>
      </form>
    );
  }