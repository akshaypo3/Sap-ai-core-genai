import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { ContentLayout } from "@/components/sustena-layout/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Slash } from "lucide-react";
import  UploadButton  from "@/components/datahub/UploadButton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getallFiles } from "@/lib/datahub/data";
import { DownloadFileButton} from "@/components/datahub/downloadButton";


export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");  }

  const files = await getallFiles();
 
  return (
    <>
      <ContentLayout title="Library">
      <div className="mb-8 p-10 flex items-center justify-between bg-white dark:bg-neutral-950 rounded-md border">
        <div>
          <h1 className="font-bold text-2xl mb-2">Data Hub: Library</h1>
          <Breadcrumb>
              <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/reporting/dashboard/">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <Slash />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/datahub/library">Library</BreadcrumbLink>
                  </BreadcrumbItem>
              </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex space-x-4">          
        </div> 
      </div>
      {/* Home */}
      <p>File Upload</p>
      <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-5">
        <Table>
          <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead> 
            <TableHead>Created</TableHead>
            <TableHead>Action</TableHead>                                                
          </TableRow>
        </TableHeader>
        <TableBody>
          {files?.map((file) => (
            <TableRow key={file.id}>
              <TableCell>{file.id || 'NA '}</TableCell>
              <TableCell className="font-medium">{file.name || 'NA '}</TableCell>    
              <TableCell className="font-medium">{file.created_at || 'NA '}</TableCell>
              <TableCell><DownloadFileButton name={file.name}/> </TableCell>          
              </TableRow>            
          ))}
        </TableBody>        
      </Table>
      </div>
    </ContentLayout>
    <div>   
    <div className="bg-white dark:bg-neutral-950 rounded-md border mt-3 p-5 flex items-center justify-center">
        <div className="flex items-center">
          <UploadButton/>
        </div>
      </div> 
                  
    </div>
    </>
  );
}
