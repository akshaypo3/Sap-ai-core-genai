"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { smtpSchema, SMTPSettingsFormData } from "@/schemas/smtpSchema";
import { sendMail } from "@/lib/settings/smtp/action";
import { useToast } from "@/components/ui/use-toast";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SmtpSettings({ settings }: { settings: any }) {
  const smtpData = settings?.data || {};
  const { toast } = useToast();

  const form = useForm<SMTPSettingsFormData>({
    resolver: zodResolver(smtpSchema),
    defaultValues: {
      host: smtpData.host || "",
      username: smtpData.username || "",
      password: smtpData.password || "",
      ssl: smtpData.ssl ? "true" : "false",
      port: smtpData.port || 587,
    },
  });

  const handleSubmit = async (data: SMTPSettingsFormData) => {
    try {
      // Simulate saving or updating settings
      console.log("Submitted SMTP Settings:", data);

      toast({
        variant: "success",
        title: "Settings Saved!",
        description: "SMTP settings updated successfully.",
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save SMTP settings.",
      });
    }
  };

  const handleClick = async () => {
    const emailDetails = {
      to: "kevin.renner@vaspp.com",
      subject: "SMTP Test Mail",
      text: "SMTP Test Mail",
      html: "<b>SMTP Test successful</b>",
    };

    try {
      const response: any = await sendMail(emailDetails);
      if (response === true) {
        toast({
          variant: "success",
          title: "E-Mail Sent!",
          description: "SMTP settings are correct.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Test Failed!",
          description: "Check logs for more details.",
        });
      }
    } catch (error) {
      console.error("Error sending test mail:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send test email.",
      });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="grid w-full items-center gap-1.5 mb-2">
        <Label htmlFor="host">SMTP Host</Label>
        <Input
          {...form.register("host")}
          placeholder="Host"
        />
        <p className="text-red-500 text-sm">{form.formState.errors.host?.message}</p>

        <Label htmlFor="username">Username</Label>
        <Input
          {...form.register("username")}
          placeholder="Username"
        />
        <p className="text-red-500 text-sm">{form.formState.errors.username?.message}</p>

        <Label htmlFor="password">Password</Label>
        <Input
          {...form.register("password")}
          placeholder="Password"
          type="password"
        />
        <p className="text-red-500 text-sm">{form.formState.errors.password?.message}</p>

        <div className="flex">
          <div>
            <Label htmlFor="ssl">Encryption</Label>
            <Select
              onValueChange={(value) => form.setValue("ssl", value)}
              value={form.watch("ssl")}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">SSL/TLS</SelectItem>
                <SelectItem value="false">None</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-red-500 text-sm">{form.formState.errors.ssl?.message}</p>
          </div>
          <div className="ml-5 w-full">
            <Label htmlFor="port">Port</Label>
            <Input
              {...form.register("port")}
              placeholder="587"
              type="number"
            />
            <p className="text-red-500 text-sm">{form.formState.errors.port?.message}</p>
          </div>
        </div>

        <div className="flex mt-5">
          <Button className="w-full bg-green-500 hover:bg-green-600" type="submit">
            <Mail className="mr-2 h-4 w-4" /> Save SMTP Settings
          </Button>
        </div>
      </div>

      <div className="flex mt-4">
        <Button variant="outline" className="flex-auto" onClick={handleClick}>
          <Mail className="mr-2 h-4 w-4" /> Send Test Mail
        </Button>
      </div>
    </form>
  );
}
