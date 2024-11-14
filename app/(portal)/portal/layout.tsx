import "@/app/globals.css";
import { Toaster } from "@/components/ui/toaster"
import PortalLayout from "@/components/portal-layout/Portal-layout";
import { ChatProvider } from '@/app/contexts/ChatContext';
import { ChatButton } from '@/components/chats/ChatButton';
import { ChatInterface } from '@/components/chats/ChatInterface';
import { getTranslations } from 'next-intl/server';

export default async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = await getTranslations('main-layout');

  const maintenance = process.env.NEXT_PUBLIC_MAINTENANCE === "true";

  if (maintenance) {
    return (
      <main className="flex-grow w-full">
        <div className=" px-4">
          {t("maintenance")}
        </div>
      </main>
    );
  }

  return (
    <ChatProvider>
      <PortalLayout>{children}</PortalLayout>
      <ChatButton />
      <ChatInterface />
    </ChatProvider>
  );
}