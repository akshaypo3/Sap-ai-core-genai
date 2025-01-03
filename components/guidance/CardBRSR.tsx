import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, UserIcon } from "lucide-react";
import { getTimeZone } from "@/lib/settings/timezone/data";
import Link from "next/link";

export default async function CardBRSR({ userId }: { userId: string }) {
  const timezone = await getTimeZone({ userId });
  const actualTime = timezone.userWithTimezone.timezone;

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 mt-4">
        <Card className="flex flex-col h-full">
          <img
            src="/brsr_banner.png"
            alt="BRSR"
            className="w-full h-56 object-cover rounded-t-md"
          />
          <CardHeader className="h-25 overflow-hidden">
            <h3 className="text-lg font-semibold line-clamp-2">
            Business responsibility and sustainability reporting (BRSR)
            guidelines
            </h3>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground line-clamp-4">
              Navigate the complexities of the Business Responsibility and
              Sustainability Reporting (BSRS) with ease.
            </p>
          </CardContent>
          <CardFooter className="flex justify-between items-end">
            <div className="flex flex-col text-xs text-muted-foreground">
              <div className="flex items-center">
                <UserIcon className="w-3 h-3 mr-1" />
                <span>Vaspp</span>
              </div>
              <div className="flex items-center mt-1">
                <CalendarIcon className="w-3 h-3 mr-1" />
                <span>
                 24/09/2024
                </span>
              </div>
            </div>
            <Link href="/help/guidance/BRSR">
              <Button variant="outline" size="sm">
                Read More
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
