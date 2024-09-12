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
  BookText
} from "lucide-react";

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
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Assessment Center",
      menus: [
        {
          href: "/materiality/company",
          label: "Company",
          active: pathname.includes("/materiality/company"),
          icon: Building2,
          submenus: []
        },
        {
          href: "/materiality/assessments",
          label: "Materiality",
          active: pathname.includes("/materiality/dashboard"),
          icon: ScatterChart,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Reporting",
      menus: [
        {
          href: "/reporting/dashboard",
          label: "Dashboard",
          active: pathname.includes("/reporting/dashboard"),
          icon: LayoutGrid,
          submenus: []
        },
        {
          href: "/reporting/frameworks",
          label: "Frameworks",
          active: pathname.includes("/reporting/frameworks"),
          icon: BookText,
          submenus: []
        },        
        {
          href: "",
          label: "Reports",
          active: pathname.includes("/reporting/reports"),
          icon: FileText,
          submenus: [
            {
              href: "/reporting/reports",
              label: "Dashboard",
              active: pathname === "/reporting/reports"
            },
            {
              href: "/reporting/reports/internal",
              label: "Internal Reports",
              active: pathname === "/reporting/reports/internal"
            },
            {
              href: "/reporting/reports/external",
              label: "External Reports",
              active: pathname === "/reporting/reports/external"
            },
            // {
            //   href: "/reporting/reports/templates",
            //   label: "Templates",
            //   active: pathname === "/reporting/reports/templates"
            // },
          ]
        },
      ]
    },
    {
      groupLabel: "Help",
      menus: [
        {
          href: "/help/guidance",
          label: "Guidance",
          active: pathname.includes("/guidance"),
          icon: FileQuestion,
          submenus: []
        },
        {
          href: "/help/glossary",
          label: "Glossary",
          active: pathname.includes("/help/glossary"),
          icon: BookOpenText,
          submenus: []
        },
        {
          href: "/help/support",
          label: "Support",
          active: pathname.includes("/help/support"),
          icon: HeartHandshake,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Data Hub",
      menus: [
        {
          href: "/datahub/connections",
          label: "Connections",
          active: pathname.includes("/datahub/connections"),
          icon: Share2,
          submenus: []
        },
        {
          href: "/datahub/library",
          label: "Library",
          active: pathname.includes("/datahub/library"),
          icon: Library,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/settings/users",
          label: "Users",
          active: pathname.includes("/settings/users"),
          icon: Users,
          submenus: []
        },
        {
          href: "/settings/administration",
          label: "Administration",
          active: pathname.includes("/settings/administration"),
          icon: Settings,
          submenus: []
        },
      ]
    }
  ];
}
