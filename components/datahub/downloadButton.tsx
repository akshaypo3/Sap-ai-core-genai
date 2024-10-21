'use client';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useTransition } from "react";

// We will use the server action for downloading the file
import { downloadFile } from "@/lib/datahub/action";
import { useTranslations } from "next-intl";

export function DownloadFileButton({ name }: { name: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDownload = async () => {
    startTransition(async () => {
      const signedUrl = await downloadFile(name); // Trigger the server action to get signed URL

      if (signedUrl) {
        // Open the signed URL in a new tab if available
        window.open(signedUrl, '_blank');
      } else {
        console.error("Failed to retrieve signed URL");
      }
    });
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={isPending}
      className="flex items-center space-x-2 px-4 py-2 bg-gray-400 hover:bg-green-500 rounded-md" >
      <Download className="w-4 h-4 text-black" />
      <span>{isPending ? "Downloading..." : "Download"}</span>
    </Button>
  );
}
