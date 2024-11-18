"use server";

var nodemailer = require("nodemailer");
import { createClient } from "@/utils/supabase/server"; 
const createTransporter = () => {
  return nodemailer.createTransport({
    host: "mail.vaspp.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER || "saurav.kubade@vaspp.com",
      pass: process.env.EMAIL_PASS || "Imagine2024!",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

const logEmail = async (recipientEmail, status, subject, templateId = null, errorMessage = null) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("email_logs")
    .insert([{
      recipient_email: recipientEmail,
      status,
      subject,
      template_id: templateId,
      error_message: errorMessage,
    }]);

  if (error) {
    console.error("Error logging email:", error);
  }
};

const fetchEmailTemplate = async (Name) => {
  // Replace with your Supabase client initialization
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from('email_templates')
      .select('id, subject')
      .eq('name', name);

    if (error || !data.length) {
      console.error("Error fetching email template:", error || "No data found");
      throw new Error("Email template not found");
    }

    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    throw error;
  }
};

// Usage example
fetchEmailTemplate('WelcomeEmail')
  .then((template) => console.log("Fetched template:", template))
  .catch((error) => console.error("Error:", error));



export const sendEmail = async (to: string, templateName: string, text: string) => {
  const template = await fetchEmailTemplate(templateName);
  
  if (!template) {
    throw new Error("Email template not found");
  }

  const { subject, id: templateId } = template;
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_USER || "saurav.kubade@vaspp.com",
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

    
    await logEmail(to, "sent", subject, templateId);
  } catch (error) {
    console.error("Error sending email:", error);

    
    await logEmail(to, "failed", subject, templateId, error.message);

    throw new Error("Failed to send email");
  }
};

export const performActions = async (action: string, params: any) => {
  try {
    switch (action) {
      case "sendEmail":
        const { to, templateName, text } = params;
        await sendEmail(to, templateName, text);
        return { status: "Email sent successfully" };

      default:
        throw new Error("Invalid action");
    }
  } catch (error) {
    console.error("Error in performActions:", error);
    return { status: "error", message: error.message };
  }
};
