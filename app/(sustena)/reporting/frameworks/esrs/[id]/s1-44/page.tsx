import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator"
import Link from 'next/link';
import SampleQuestionManual1 from "@/components/reporting/frameworks/demo/sampleQuestionManual1";
import Subheader from "@/components/reporting/frameworks/demo/subheaderWithID";
import { ContentLayout } from '@/components/sustena-layout/content-layout';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/components/ui/breadcrumb';
import { MoveOnButton,MoveOnButton2 } from "@/components/reporting/frameworks/demo/buttons";
import { getTranslations } from 'next-intl/server';
 
export default async function Page() {

  const t = await getTranslations('reporting');

  return (
<>
<ContentLayout title={t("frameworks.esrs.s1-44.title")}>
  <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
    <div>
      <h1 className="font-bold text-2xl mb-2">{t("frameworks.esrs.s1-44.Materiality Dashboard")}</h1>
      <Breadcrumb>
          <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/">{t("frameworks.esrs.s1-44.Home")}</BreadcrumbLink>
              </BreadcrumbItem>
          </BreadcrumbList>
      </Breadcrumb>
    </div>
    <div className="flex space-x-4">
      {/* Button Section for Subheader */}
      <Link href="/reporting/frameworks/esrs/esrss1/s1-44">
       {/* <Button variant="outline">Begin smart</Button> */}
       <MoveOnButton/><MoveOnButton2/>
      </Link>
    </div>
    
  </div>
  <SampleQuestionManual1/>
</ContentLayout>

</>
  );
};