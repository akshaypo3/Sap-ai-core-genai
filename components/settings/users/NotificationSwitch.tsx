"use client";

import React, { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { NotificationToggler } from "@/lib/settings/users/action";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useTranslations } from "next-intl";

export default function NotifiactionSwitch({ profile }: { profile: any }) {
  const [isNotificationOn, setIsNotificationOn] = useState<boolean>(
    profile[0]?.notifications ?? true,
  );

  useEffect(() => {
    if (profile[0]?.notifications !== undefined) {
      setIsNotificationOn(profile[0].notifications);
    }
  }, [profile]);

  const handleToggle = async () => {
    const newNotificationStatus = !isNotificationOn;
    setIsNotificationOn(newNotificationStatus);
    await NotificationToggler(newNotificationStatus, profile[0]?.id);
  };

  const t = useTranslations("account");

  return (
    <div className="space-y-2 m-4">
      <div className="bg-white dark:bg-neutral-950 rounded-md border mt-3 p-5 flex flex-col">
        <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3">
          {t("Notifications")}
        </Label>
        <div className="flex justify-start">
          <TooltipProvider>
            <Tooltip delayDuration={100}>
              <TooltipTrigger>
                <Switch
                  className="text-2xl"
                  checked={isNotificationOn}
                  onClick={() => handleToggle()}
                />
              </TooltipTrigger>
              <TooltipContent className="ms-2" align="start" side="right">
                {isNotificationOn ? t("Enabled") : t("Disabled")}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
