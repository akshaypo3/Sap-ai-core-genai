"use client";

import React, { useState, useEffect } from "react";
import { handleTaskEmail } from "@/lib/sendMail/action";

const SendMailForm = ({ recipientEmail, placeholders }) => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    const sendEmailOnMount = async () => {
      setStatus("Sending...");

      const response = await handleTaskEmail({ recipientEmail, placeholders });
      if (response.status === "success") {
        setStatus("Email sent successfully!");
      } else {
        setStatus(`Error: ${response.message}`);
      }
    };

    sendEmailOnMount();
  }, [recipientEmail, placeholders]);

  return (null);
};

export default SendMailForm;
