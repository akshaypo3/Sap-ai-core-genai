"use client";

import { useState } from "react";
import { EditQuestionFormDialog } from "./EditQuestionForm";

interface EditQuestionSectionFormDialogProps {
  Questiondata:any;
}


export default function EditQuestionSectionPage({ Questiondata}: EditQuestionSectionFormDialogProps) {
    const [open, setOpen] = useState(false);
  
  
    return (
      <div>
        <EditQuestionFormDialog open={open} setOpen={setOpen} existingData={Questiondata}/>
      </div>
    );
  }