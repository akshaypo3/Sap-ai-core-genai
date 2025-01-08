import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function ViewTaskButton({ taskId }: { taskId: string }) {
  const t = useTranslations("tasks-com");
  return (
    <>
      <Link href={`/task/${taskId}`}>
        <Button className="mb-3 bg-green-600">{t("View Task")}</Button>
      </Link>
    </>
  );
}
