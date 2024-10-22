import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import SampleQuestion from "@/components/reporting/frameworks/demo/sampleQuestion";
import Subheader from "@/components/reporting/frameworks/demo/subheaderWithID";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import {
  MoveOnButton,
  MoveOnButton2,
} from "@/components/reporting/frameworks/demo/buttons";
import { getTranslations } from "next-intl/server";
import { BreadCrumbCom } from "@/components/BredCrumb";
import { BackButton } from "@/components/BredCrumbButtons";

export default async function Page() {
  const t = await getTranslations("reporting");
  const breadcrumbs = [
    { href: "/dashboard/", text: t("frameworks.esrs.s1-59.Home") }
  ];
  return (
    <>
      <ContentLayout title={t("frameworks.esrs.s1-59.title")}>
        <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
          <BreadCrumbCom title={t("frameworks.esrs.s1-59.Materiality Dashboard")} breadcrumbs={breadcrumbs} backButton={<BackButton/>}/>
          <div className="flex space-x-4">
            {/* Button Section for Subheader */}
            <Link href="/reporting/frameworks/esrs/esrss1/s1-44">
              {/* <Button variant="outline">Begin smart</Button> */}
              <MoveOnButton />
              <MoveOnButton2 />
            </Link>
          </div>
        </div>
        <SampleQuestion />
      </ContentLayout>
    </>
  );
}
