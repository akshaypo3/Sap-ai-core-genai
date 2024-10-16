import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ViewTaskButton({ taskId }: { taskId: string }) {
  return (
    <>
      <Link href={`/task/${taskId}`}>
        <Button className="mb-3 bg-green-600">View Task</Button>
      </Link>
    </>
  );
}
