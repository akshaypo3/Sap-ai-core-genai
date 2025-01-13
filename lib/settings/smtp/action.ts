"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
var nodemailer = require("nodemailer");


interface EmailDetails {
  to: string | string[];
  subject: string;
  text: string;
  html: string;
}

export async function sendMail({ to, subject, text, html }: EmailDetails) {
  const supabase = await createClient();
  const { data: settings, error } = await supabase
    .from("smtpsettings")
    .select()
    .single();

  if (error) {
    console.error("Error fetching SMTP settings:", error);
    return { success: false, error: "Failed to fetch SMTP settings" };
  }
  let secureBool;
  if(settings.port==465){
    secureBool = true;
  }else{
    secureBool = false;
  };

  const transporter = nodemailer.createTransport({
    host: settings.host,
    port: settings.port,
    secure: secureBool, 
    auth: {
      user: settings.username,
      pass: settings.password,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"SMTP API" <${settings.username}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("Email sent:", info);
    return true;
  } catch (error) {
    console.error("Mail send error:", error);
    return false;
  }
}
  
  export async function testForm(formData:FormData){
          console.log("Host: ",formData.get("host"));
          console.log("Username: ",formData.get("username"));
          console.log("Password: ",formData.get("password"));
          console.log("SSL: ",formData.get("ssl"));
          console.log("Port: ",formData.get("port"));
  }
  
  export async function createOrUpdateEmailSettings(formData:FormData){
    try {
        const supabase = await createClient();
        const settings=0;
      if(settings==null){
  
        const savedSettings = await prisma.emailSettings.create({
          data: {
            host,
            username,
            password,
            ssl,
            port
          }
        });
      }else{
  
        let host = formData.get("host");
        let username = formData.get("username")
        let password = formData.get("password")
        let ssl = formData.get("ssl")
        let port = parseInt(formData.get("port"))
  
        const savedSettings = await prisma.emailSettings.update({
          where: {
            id: 1
          },
          data: {
            host,
            username,
            password,
            ssl,
            port
          }
        });
      }
  
    } catch (error){
      console.log("Error creating or updating E-Mail Settings: ",error)
    }
  }