"use client";

import { useState } from "react";
import { QuestionFormSectionDialog } from "./CreateQuestionFormSectionArray";

interface CreateQuestionSectionFormDialogProps {
  framework_id: string;
  sections:any;
}


export default function CreateQuestionSectionPage({ framework_id,sections}: CreateQuestionSectionFormDialogProps) {
    const [open, setOpen] = useState(false);
  
    return (
      <div>
        <QuestionFormSectionDialog open={open} setOpen={setOpen} framework_id={framework_id} sections={sections}/>
      </div>
    );
  }