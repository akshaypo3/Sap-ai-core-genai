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
import SustenaLoginLayout from "@/components/sustena-layout/sustena-login-layout";
import { NavbarLogin } from "@/components/sustena-layout/navbar-login";



export const metadata: Metadata = {
  title: "VASPP Sutena",
  description: "Development Version",
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
        {/* <Footer/> */}
        <Toaster />
      </ThemeProvider>
      </body>
    </html>
    ):(
      <>
      <html lang="en" className={GeistSans.className}>
      <body>
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    <div className="flex flex-col min-h-screen">
      <NavbarLogin />
      {/* Flex-grow ensures the main content expands to fill the available space */}
      <main className="flex-grow flex items-center justify-center">
        {children}
      </main>
    </div>
    <Toaster />
  </ThemeProvider>
</body>

    </html>
    </>
    )}
    </>
  );
}
