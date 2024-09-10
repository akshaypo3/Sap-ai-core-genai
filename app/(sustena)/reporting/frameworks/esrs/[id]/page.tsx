import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator"
import Link from 'next/link';
import DatapointsTableS1 from "@/components/reporting/frameworks/demo/datapointsTableS1";

 
export default async function Page() {

  return (
    <>
    <div className="bg-white p-5 border rounded">
      <DatapointsTableS1/>
    </div>
    </>
  );
};