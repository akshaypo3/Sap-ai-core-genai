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



export function getMenuList(pathname: string): Group[] {
  const t = useTranslations("Menu");
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: t("Dashboard"),
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/task",
          label: t("Task"),
          active: pathname.includes("/task"),
          icon: SquareCheckBig,
          submenus: []
        }
      ]
    },
    {
      groupLabel: t("Assessment Center"),
      menus: [
        {
          href: "/materiality/company",
          label: t("Company"),
          active: pathname.includes("/materiality/company"),
          icon: Building2,
          submenus: []
        },
        {
          href: "/materiality/goals",
          label: t("Goals"),
          active: pathname.includes("/materiality/goals"),
          icon: Goal,
          submenus: []
        },  
        {
          href: "/materiality/assessments",
          label: t("Materiality"),
          active: pathname.includes("/materiality/dashboard"),
          icon: ScatterChart,
          submenus: []
        }
      ]
    },
    {
      groupLabel: t("Reporting"),
      menus: [
        {
          href: "/reporting/dashboard",
          label: t("Dashboard"),
          active: pathname.includes("/reporting/dashboard"),
          icon: LayoutGrid,
          submenus: []
        },
        {
          href: "/reporting/frameworks",
          label: t("Frameworks"),
          active: pathname.includes("/reporting/frameworks"),
          icon: BookText,
          submenus: []
        },        
        {
          href: "/reporting/reports",
          label: t("Reports"),
          active: pathname.includes("/reporting/reports"),
          icon: FileText,
          submenus: []
        }, 
      ]
    },
    {
      groupLabel: t("Help"),
      menus: [
        {
          href: "/help/guidance",
          label: t("Guidance"),
          active: pathname.includes("/guidance"),
          icon: FileQuestion,
          submenus: []
        },
        {
          href: "/help/glossary",
          label: t("Glossary"),
          active: pathname.includes("/help/glossary"),
          icon: BookOpenText,
          submenus: []
        },
        {
          href: "/help/support",
          label: t("Support"),
          active: pathname.includes("/help/support"),
          icon: HeartHandshake,
          submenus: []
        }
      ]
    },
    {
      groupLabel: t("Data Hub"),
      menus: [
        {
          href: "/datahub/connections",
          label: t("Connections"),
          active: pathname.includes("/datahub/connections"),
          icon: Share2,
          submenus: []
        },
        {
          href: "/datahub/library",
          label: t("Library"),
          active: pathname.includes("/datahub/library"),
          icon: Library,
          submenus: []
        }
      ]
    },
    {
      groupLabel: t("Settings"),
      menus: [
        {
          href: "/settings/users",
          label: t("Users"),
          active: pathname.includes("/settings/users"),
          icon: Users,
          submenus: []
        },
        {
          href: "/settings/administration",
          label: t("Administration"),
          active: pathname.includes("/settings/administration"),
          icon: Settings,
          submenus: []
        },
      ]
    }
  ];
}
