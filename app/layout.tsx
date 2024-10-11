import type { Metadata } from "next";
import "@/app/globals.css";
import { GeistSans } from 'geist/font/sans';
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';
import { LocaleProvider } from "@/app/contexts/LanContext";

export const metadata: Metadata = {
  title: "VASPP Sustena",
  description: "Sustainability Reporting Platform",
  metadataBase: new URL('https://sustena.vaspp.com'), 
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  let messages;
  try {
    messages = await getMessages();
  } catch (error) {
    console.error("Error fetching messages:", error);
    messages = {}; 
  }

  return (
    <html lang={locale} className={GeistSans.className}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <LocaleProvider>
              {children}
            </LocaleProvider>
          </NextIntlClientProvider>
          <Toaster/>
        </ThemeProvider>
      </body>
    </html>
  );
}