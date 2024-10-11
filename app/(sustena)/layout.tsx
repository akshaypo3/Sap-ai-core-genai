import "@/app/globals.css";
import { Toaster } from "@/components/ui/toaster"
import SustenaLayout from "@/components/sustena-layout/sustena-layout";
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
        <div className="container mx-auto px-4 max-w-7xl">
          {t("maintenance")}
        </div>
      </main>
    );
  }

  return (
    <ChatProvider>
      <SustenaLayout>{children}</SustenaLayout>
      <ChatButton />
      <ChatInterface />
    </ChatProvider>
  );
}