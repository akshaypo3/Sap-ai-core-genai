"use client"

import { useState, ChangeEvent, FormEvent } from 'react';
import React from "react";
import { Mail, SmilePlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
// import { sendMail } from "@/app/lib/actions"
// import { useToast } from "@/components/ui/use-toast"
// import { testForm } from "@/app/lib/actions";
// import { createOrUpdateEmailSettings } from "@/app/lib/actions";

import { sendMail } from "@/lib/settings/smtp/action";
import { useToast } from '@/components/ui/use-toast';
import { useTranslations } from "next-intl";


interface SMTPSettingsFormData {
    host: string;
    username: string;
    password: string;
    ssl: string;
    port: number;
}

export default function SmtpSettings(smtpSettings:any){

    // console.log("Settings from props: ",smtpSettings);
    const smtpData = smtpSettings?.settings.data || {};

    const { toast } = useToast()

    const handleClick = async () => {

        const emailDetails = {
            to: "kevin.renner@vaspp.com",
            subject: "SMTP Test Mail",
            text: "SMTP Test Mail",
            html: "<b>SMTP Test successful</b>"
        };

        try {
            const response:any = await sendMail(emailDetails);
            if(response==true){
                toast({
                    variant: "success",
                    title: "E-Mail sent successfully!",
                    description: "Your settings seem to be correct!",
                  })
            }
            else{
                toast({
                    variant: "destructive",
                    title: "Something went wrong!",
                    description: "Please check logs for detailed info!",
                  })
            };
        } catch (error) {
            console.error(error); 
        }
    };  

    return(
        <>
            <form>
                <div className="grid w-fullitems-center gap-1.5 mb-2">
                    <Label htmlFor="host">SMTP Host</Label>
                    <Input type="text" name="host" defaultValue={smtpData.host || "Host"} />
                    <Label htmlFor="username">Username</Label>
                    <Input type="text" name="username" defaultValue={smtpData.username || "User"}/>
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" name="password" defaultValue={smtpData.password || "User"}/>
                    <div className="flex">
                        <div>
                            <Label htmlFor="ssl">Encryption</Label>
                            <Select name="ssl" defaultValue={smtpData.ssl ? "true" : "false"}>
                                <SelectTrigger>
                                    <SelectValue/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="true">SSL/TLS</SelectItem>
                                    <SelectItem value="false">None</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="ml-5 w-full">
                            <Label htmlFor="port">Port</Label>
                            <Input type="number" name="port" defaultValue={smtpData.port || "587"}/>
                        </div>
                    </div>
                    <div className="flex mt-5">
                        <div className="flex-auto">
                            <Button className="w-full bg-green-500 hover:bg-green-600" type="submit">
                                <Mail className="mr-2 h-4 w-4" /> Save SMTP Settings
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
            <div className="flex">
                <Button variant="outline" className="flex-auto" onClick={handleClick}>
                    <Mail className="mr-2 h-4 w-4"/> Send Test Mail
                </Button>
            </div>
        </>
    )
}