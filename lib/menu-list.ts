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
  HeartHandshake
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
      groupLabel: "Reporting Center",
      menus: [
        {
          href: "/company",
          label: "Company",
          active: pathname.includes("/company"),
          icon: Building2,
          submenus: []
        },
        {
          href: "",
          label: "Materiality",
          active: pathname.includes("/materiality"),
          icon: ScatterChart,
          submenus: [
            {
              href: "/materiality/dashboard",
              label: "Dashboard",
              active: pathname === "/materiality/dashboard"
            },
            {
              href: "/materiality/stakeholders",
              label: "Stakeholder Analysis",
              active: pathname === "/materiality/stakeholders"
            },
            {
              href: "/materiality/stakeholdersurvey",
              label: "Stakeholder Survey",
              active: pathname === "/materiality/stakeholdersurvey"
            },
            {
              href: "/materiality/assessments",
              label: "Assessments",
              active: pathname === "/materiality/assessments"
            }
          ]
        },
        {
          href: "",
          label: "Frameworks",
          active: pathname.includes("/frameworks"),
          icon: ClipboardList,
          submenus: [
            {
              href: "/frameworks/dashboard",
              label: "Dashboard",
              active: pathname === "/frameworks/dashboard"
            },
            {
              href: "/frameworks/editor",
              label: "Framework Editor",
              active: pathname === "/frameworks/editor"
            }
          ]
        },
        {
          href: "",
          label: "Reporting",
          active: pathname.includes("/reporting"),
          icon: FileText,
          submenus: [
            {
              href: "/reporting/dashboard",
              label: "Dashboard",
              active: pathname === "/reporting/dashboard"
            },
            {
              href: "/reporting/internal",
              label: "Internal Reporting",
              active: pathname === "/reporting/internal"
            },
            {
              href: "/reporting/external",
              label: "External Reporting",
              active: pathname === "/reporting/external"
            },
            {
              href: "/reporting/templates",
              label: "Templates",
              active: pathname === "/reporting/templates"
            },
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
