import type { Metadata } from "next";
import "@/app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { LocaleProvider } from "./contexts/lanContext";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
// import MainLayout from "@/components/layout/MainLayout";
import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: "VASPP Sustena",
  description: "Sustainability Reporting Platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  let maintenance;
  if(process.env.MAINTENANCE === "true"){
    maintenance = true;
  } else if (process.env.MAINTENANCE === "false"){
    maintenance = false;
  };

  const locale = await getLocale();

  const messages = await getMessages();

  const t = await getTranslations('app-layout');

    return (
    <>
    { maintenance == true ? (
      <html lang="en" className={GeistSans.className}>
      <body className="min-h-screen flex flex-col items-center bg-gray-100 dark:bg-black">
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        {/* <MaintenanceHeader /> */}
          <main className="flex-grow w-full ">
            <div className="container mx-auto px-4 max-w-7xl  ">
                {t("maintainance")}
            </div>
        </main>
        {/* <Footer/> */}
      </ThemeProvider>
      </body>
    </html>
    ):(
      <>
      <html lang={locale} className={GeistSans.className}>
      <body>
      <NextIntlClientProvider messages={messages}>
      <LocaleProvider>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
        <Toaster/>
      </ThemeProvider>
      </LocaleProvider>
      </NextIntlClientProvider>
      </body>
    </html>
    </>
    )}
    </>
  );
}
