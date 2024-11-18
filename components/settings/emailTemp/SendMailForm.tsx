"use client";

import React, { useState } from "react";
import { performActions } from "@/lib/sendMail/action"; 

const SendMailForm = () => {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setStatus("Sending...");
    
    const to = "saurav.kubade@vaspp.com";  
    const templateName = "new_task"; 
    const taskName = "Sample Task";  
    const taskDueDate = "11/22/2024"; 
    const taskLink = `test`; 
    
    const text = `
      Hello,

      A new task (${taskName}) has been assigned to you. It is due on ${taskDueDate}.
      Check it out here: ${taskLink}

      ---

      Sustena Team
    `;
    
    try {
      const response = await performActions("sendEmail", { to, templateName, text });
      setStatus(response.status === "Email sent successfully" ? "Email sent successfully!" : "Failed to send email");
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus("Error sending email");
    }
  };

  return (
    <div>
      <h2>Send Email</h2>
      <button onClick={handleSubmit}>Send Email</button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default SendMailForm;
