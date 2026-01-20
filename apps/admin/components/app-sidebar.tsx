"use client"

import * as React from "react"
import {
  IconBusinessplan,
  IconDashboard,
  IconReport,
  IconUsers,
  IconSettings,
} from "@tabler/icons-react"

import { NavFunds } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-provider"
import Link from "next/link"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: IconDashboard,
    },
    // {
    //   title: "Lifecycle",
    //   url: "#",
    //   icon: IconListDetails,
    // },
    // {
    //   title: "Analytics",
    //   url: "#",
    //   icon: IconChartBar,
    // },
    {
      title: "Team",
      url: "/team",
      icon: IconUsers,
    },
    {
      title: "News",
      url: "/news",
      icon: IconReport,
    },
    {
      title: "Support Team",
      url: "/support-team",
      icon: IconUsers,
    },
    {
      title: "Branches",
      url: "/branches",
      icon: IconBusinessplan,
    },
    {
      title: "Contact Messages",
      url: "/contact-messages",
      icon: IconReport,
    },
    {
      title: "Contact & Social",
      url: "/contact-settings",
      icon: IconSettings,
    },
  ],
  // navClouds: [
  //   {
  //     title: "Capture",
  //     icon: IconCamera,
  //     isActive: true,
  //     url: "#",
  //     items: [
  //       {
  //         title: "Active Proposals",
  //         url: "#",
  //       },
  //       {
  //         title: "Archived",
  //         url: "#",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Proposal",
  //     icon: IconFileDescription,
  //     url: "#",
  //     items: [
  //       {
  //         title: "Active Proposals",
  //         url: "#",
  //       },
  //       {
  //         title: "Archived",
  //         url: "#",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Prompts",
  //     icon: IconFileAi,
  //     url: "#",
  //     items: [
  //       {
  //         title: "Active Proposals",
  //         url: "#",
  //       },
  //       {
  //         title: "Archived",
  //         url: "#",
  //       },
  //     ],
  //   },
  // ],
  // navSecondary: [
  //   {
  //     title: "Settings",
  //     url: "/branches",
  //     icon: IconSettings,
  //   },
  //   {
  //     title: "Get Help",
  //     url: "#",
  //     icon: IconHelp,
  //   },
  //   {
  //     title: "Search",
  //     url: "#",
  //     icon: IconSearch,
  //   },
  // ],
  funds: [
    {
      name: "Fund",
      url: "/fund",
      icon: IconBusinessplan,
    },
    {
      name: "Fund Reports",
      url: "/fund-reports",
      icon: IconReport,
    },
  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth()
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <Image src={"/images/logo-icon.svg"} width={20} height={20} alt="CB" />
                <span className="text-base font-semibold">Ceybank</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavFunds items={data.funds} />
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        {!!user && <NavUser {...user} />}
      </SidebarFooter>
    </Sidebar>
  )
}
