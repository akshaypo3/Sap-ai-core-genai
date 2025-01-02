"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { UserIcon } from "lucide-react";

export default function ActiveFramewrokCards({
  activeFrameworks,
}: {
  activeFrameworks: any;
}) {
  return (
    <>
      <h1 className="font-bold text-lg mt-10">Active Frameworks</h1>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 mt-4">
        {activeFrameworks.map((framework:any) => (
          <Card key="1" className="flex flex-col h-full">
            {framework.framework_type == "CDP" && (
              <img
                src="/cdp_banner.png?height=200&width=300"
                alt="CDP"
                className="w-full h-48 object-cover rounded-t-md"
              />
            )}
            {framework.framework_type == "BRSR" && (
              <img
                src="/brsr_banner.png?height=200&width=300"
                alt="BRSR"
                className="w-full h-48 object-cover rounded-t-md"
              />
            )}
            {framework.framework_type == "ESRS" && (
              <img
                src="/esrs_banner.png?height=200&width=300"
                alt="ESRS for CSRD"
                className="w-full h-48 object-cover rounded-t-md"
              />
            )}
            {framework.framework_type == "GRI" && (
              <img
                src="/gri_banner.png?height=200&width=300"
                alt="GRI"
                className="w-full h-48 object-cover rounded-t-md"
              />
            )}
            {framework.framework_type == "SASB" && (
              <img
                src="/sasb_banner.png?height=200&width=300"
                alt="SASB"
                className="w-full h-48 object-cover rounded-t-md"
              />
            )}
            <CardHeader className="h-24 overflow-hidden">
              <h3 className="text-lg font-semibold line-clamp-2">
                {framework.name}
              </h3>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground line-clamp-4">
                {framework.description}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-end">
              {/* <div className="flex flex-col text-xs text-muted-foreground">
                <div className="flex items-center">
                  <UserIcon className="w-3 h-3 mr-1" />
                  <span>VASPP Deutschland</span>
                </div>
                <div className="flex items-center mt-1">
                  <Progress value={0} />
                </div>
              </div> */}
              <Link href={`/reporting/frameworks/${framework.id}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-green-500 hover:bg-green-600 text-white hover:text-white"
                >
                  Select
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
