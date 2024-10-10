import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator"
import Link from 'next/link';
import StandardsOverview from "@/components/reporting/frameworks/demo/standardsOverview";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { getTranslations } from 'next-intl/server';
 
export default async function Page() {
  const t = await getTranslations('reporting');
  return (
    <>
    <ContentLayout title={t("esrs.title")}>
      <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
        <div>
          <h1 className="font-bold text-2xl mb-2">{t("esrs.Materiality Dashboard")}</h1>
          <Breadcrumb>
              <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard/">{t("esrs.Home")}</BreadcrumbLink>
                  </BreadcrumbItem>
              </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex space-x-4">
          {/* Button Section for Subheader */}
          <Link href="/reporting/frameworks/esrs/esrss1/s1-44">
           <Button className="bg-green-500 hover:bg-green-600 text-white hover:text-white">{t("esrs.continue")}</Button>
          </Link>
        </div>
        
      </div>
      <StandardsOverview/>
    </ContentLayout>
    
    </>
  );
};