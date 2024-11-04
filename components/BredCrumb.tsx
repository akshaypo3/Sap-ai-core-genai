"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";

export function BreadCrumbCom({
  breadcrumbs,
  title,
  backButton,
  contineButton,
}: {
  breadcrumbs: { href: string; text: string }[];
  title: string;
  backButton?: JSX.Element;
  contineButton?:JSX.Element;
}) {
  return (
    <div className="flex items-center justify-between w-full">
      <div>
        <h1 className="font-bold text-2xl mb-2">{title}</h1>
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs &&
              breadcrumbs.map((crumb, index) => (
                <BreadcrumbItem key={index}>
                  <BreadcrumbLink href={crumb.href}>
                    {crumb.text}
                  </BreadcrumbLink>
                  {index < breadcrumbs.length - 1 && (
                    <BreadcrumbSeparator>
                      <Slash />
                    </BreadcrumbSeparator>
                  )}
                </BreadcrumbItem>
              ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex space-x-4 items-center justify-end">
        {backButton}
        {contineButton}
      </div>
    </div>
  );
}
