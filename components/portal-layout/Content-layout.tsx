import { PortalNavbar } from "@/components/portal-layout/Navbar";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function PortalContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div>
      <PortalNavbar title={title} />
      <div className="pt-8 pb-8 px-4 sm:px-8">{children}</div>
    </div>
  );
}
