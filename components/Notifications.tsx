"use server";

import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { getNotifications } from "@/lib/settings/users/data";
import { getTranslations } from "next-intl/server";
import { getProfile } from "@/lib/settings/users/data";
import Link from "next/link";

type Notification = {
  id: string;
  created_at: string;
  user_id: string;
  name: string;
  message: string;
  type: "task" | "mention" | "system" | "alert";
  link?: string | null;
  viewed_at: string | null;
  archived: boolean;
  updated_at: string;
};

export async function Notifications() {
  const notifications = await getNotifications();
  const userProfile = await getProfile();
  const t = await getTranslations("notifications");

  const isNotificationsEnabled = userProfile?.[0]?.notifications ?? false;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Bell className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:text-white" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-96 h-80 overflow-y-auto"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {t("Notifications")}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Tabs defaultValue="inbox" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="inbox"
              className="border-b-2 focus:border-black"
            >
              {t("Inbox")}
            </TabsTrigger>
            <TabsTrigger
              value="archive"
              className="border-b-2 focus:border-black"
            >
              {t("Archive")}
            </TabsTrigger>
          </TabsList>
          <div className="bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 p-3 border rounded-lg">
            {isNotificationsEnabled ? (
              <>
                <TabsContent value="inbox">
                  {notifications?.some(
                    (notification) => !notification.archived,
                  ) ? (
                    notifications?.map(
                      (notification: Notification) =>
                        !notification.archived && (
                          <div
                            key={notification.id}
                            className="mb-2 flex items-center justify-between space-x-4 dark:border-neutral-800"
                          >
                            <Checkbox />
                            <div className="flex-1">
                              <div className="flex items-center space-x-1">
                                <h3 className="text-sm font-medium">
                                  {t("New")} {notification.type}
                                </h3>
                                <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                              </div>
                              <p className="text-xs text-gray-500">
                                {notification.message}
                              </p>
                            </div>
                            {notification.link && (
                              <Link href={notification.link}>
                                <Button asChild variant="outline" size="sm">
                                  <span>{t("View")}</span>
                                </Button>
                              </Link>
                            )}
                          </div>
                        ),
                    )
                  ) : (
                    <p className="text-sm">
                      {t("No inbox notifications available")}
                    </p>
                  )}
                </TabsContent>
                <TabsContent value="archive">
                  {notifications?.some(
                    (notification) => notification.archived,
                  ) ? (
                    notifications?.map(
                      (notification) =>
                        notification.archived && (
                          <div
                            key={notification.id}
                            className="flex items-center justify-between space-x-4 dark:border-neutral-800"
                          >
                            <Checkbox />
                            <div className="flex-1">
                              <div className="flex items-center space-x-1">
                                <h3 className="text-sm font-medium">
                                  {t("New")} {notification.type}
                                </h3>
                                <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                              </div>
                              <p className="text-xs text-gray-500">
                                {notification.message}
                              </p>
                            </div>
                            {notification.link && (
                              <Link href={notification.link}>
                                <Button asChild variant="outline" size="sm">
                                  <span>{t("View")}</span>
                                </Button>
                              </Link>
                            )}
                          </div>
                        ),
                    )
                  ) : (
                    <p className="text-sm">
                      {t("No archived notifications available")}
                    </p>
                  )}
                </TabsContent>
              </>
            ) : (
              <p className="text-sm">{t("Please enable notifications to view notifications")}.</p>
            )}
          </div>
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
