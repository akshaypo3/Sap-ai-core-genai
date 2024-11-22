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
    const { error } = await supabase
      .from("email_logs")
      .insert([
        {
          recipient_email: recipientEmail,
          status,
          subject,
          template_id: templateId,
          error_message: errorMessage,
        },
      ]);

    if (error) {
      console.error("Error logging email:", error.message);
    }
  };

  const fetchEmailTemplate = async (templateName) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("email_templates")
      .select("id, subject, body_text, body_html, sender_name, sender_email")
      .eq("name", templateName);

    if (error) {
      throw new Error(`Error fetching email template: ${error.message}`);
    }

    if (!data || data.length !== 1) {
      throw new Error(
        `Invalid number of email templates found for "${templateName}": ${data ? data.length : 0}`
      );
    }

    return data[0];
  };

  export const handleTaskEmail = async ({ recipientEmail, placeholders }) => {
    const transporter = createTransporter();
    let template = null;
  
    try {
      if (placeholders.category === "createTaskForm") {
        template = await fetchEmailTemplate("TaskCreate");
      } else if (placeholders.category === "taskStatusUpdate") {
        template = await fetchEmailTemplate("TaskStatusUpdate");
      } else {
        console.log("No matching category found. Returning null.");
        return null;  
      }
  
      const replacePlaceholders = (templateString) => {
        return templateString.replace(/\${(.*?)}/g, (_, key) => {
          const value = placeholders[key];
          if (value === undefined) {
            console.error(`Placeholder "${key}" not found in provided placeholders:`, placeholders);
            return "";
          }
          return value;
        });
      };
  
      const dynamicText = replacePlaceholders(template.body_text);
      const dynamicHtml = replacePlaceholders(template.body_html);
      const subject = replacePlaceholders(template.subject);
  
      const mailOptions = {
        from: `"${template.sender_name}" <${template.sender_email}>`,
        to: recipientEmail,
        subject,
        text: dynamicText,
        html: dynamicHtml,
      };
  
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
  
      await logEmail(recipientEmail, "sent", subject, template.id);
      return { status: "success", message: "Email sent successfully!" };
    } catch (error) {
      console.error("Error sending email:", error.message);
  
      await logEmail(
        recipientEmail,
        "failed",
        template ? template.subject : "New Task Assigned",
        template?.id || null,
        error.message
      );
      return { status: "error", message: error.message };
    }
  };
  