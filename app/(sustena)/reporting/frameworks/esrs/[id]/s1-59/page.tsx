import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator"
import Link from 'next/link';
import SampleQuestion from "@/components/reporting/frameworks/demo/sampleQuestion";
import Subheader from "@/components/reporting/frameworks/demo/subheaderWithID";
import { ContentLayout } from '@/components/sustena-layout/content-layout';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/components/ui/breadcrumb';
import { MoveOnButton,MoveOnButton2 } from "@/components/reporting/frameworks/demo/buttons";
 
export default async function Page() {


  return (
<>
<ContentLayout title="Materiality Dashboard">
  <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
    <div>
      <h1 className="font-bold text-2xl mb-2">Materiality Dashboard</h1>
      <Breadcrumb>
          <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/">Home</BreadcrumbLink>
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
  <SampleQuestion/>
</ContentLayout>

</>
  );
};