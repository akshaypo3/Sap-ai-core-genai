import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ViewTaskActivityButton({ activityId }: { activityId: string }) {
  return (
    <>
      <Link href={`/task/taskLogs/${activityId}`}>
        <Button className="mb-3 bg-green-600">View Changes</Button>
      </Link>
    </>
  );
}