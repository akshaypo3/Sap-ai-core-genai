import type { Metadata } from "next";
import "@/app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"


export const metadata: Metadata = {
  title: "VASPP NEXUS",
  description: "VASPP Internal Framework",
};

export default function RootLayout({
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
                We are undergoing scheduled maintenance. Please come back later!
            </div>
        </main>
        <Footer/>
        <Toaster />
      </ThemeProvider>
      </body>
    </html>
    ):(
      <>
      <html lang="en" className={GeistSans.className}>
      <body className="min-h-screen flex flex-col items-center w-full bg-gray-100 dark:bg-black bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#111111_1px,transparent_1px)] [background-size:16px_16px] ">
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <Header />
          <main className="flex-grow w-full ">
            <div className="container mx-auto px-4 max-w-7xl  ">
                {children}
            </div>
        </main>
        <Footer/>
        <Toaster />
      </ThemeProvider>
      </body>
    </html>
    </>
    )}
    </>
  );
}
