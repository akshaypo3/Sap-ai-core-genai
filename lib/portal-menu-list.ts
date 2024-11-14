import {
    Tag,
    Users,
    Settings,
    Bookmark,
    SquarePen,
    LayoutGrid,
    LucideIcon,
    Share2,
    Library,
    Building2,
    ClipboardList,
    ScatterChart,
    FileText,
    FileQuestion,
    BookOpenText,
    HeartHandshake,
    BookText,
    Goal,
    SquareCheckBig,
    CircleHelp 
  } from "lucide-react";
  import { useTranslations } from "next-intl";
  
  type Submenu = {
    href: string;
    label: string;
    active: boolean;
  };
  
  type Menu = {
    href: string;
    label: string;
    active: boolean;
    icon: LucideIcon
    submenus: Submenu[];
  };
  
  type Group = {
    groupLabel: string;
    menus: Menu[];
  };
  
  
  export function getPortalMenuList(pathname: string): Group[] {
    const t = useTranslations("Menu");
    return [
      {
        groupLabel: "",
        menus: [
          {
            href: "/portal/dashboard",
            label: t("Dashboard"),
            active: pathname.includes("/portal/dashboard"),
            icon: LayoutGrid,
            submenus: []
          },
          {
            href: "/portal/questions",
            label: t("Questions"),
            active: pathname.includes("/portal/questions"),
            icon: CircleHelp,
            submenus: []
          }
        ]
      },
    ];
  }
  