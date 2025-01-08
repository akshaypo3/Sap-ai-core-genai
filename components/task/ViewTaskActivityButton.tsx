import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "use-intl";

export function ViewTaskActivityButton({ activityId }: { activityId: string }) {
  const t = useTranslations("tasks-com");
  return (
    <>
      <Link href={`/task/taskLogs/${activityId}`}>
        <Button className="mb-3 bg-green-600">{t("View Changes")}</Button>
      </Link>
    </>
  );
}