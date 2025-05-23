'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  HomeIcon,
  UserCog,
  SquareChartGantt,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import logo from '@/assets/logo.png';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useUser } from '@/context/UserContext';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar> & { collapsed?: boolean }) {
  const { user } = useUser();

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (key: string) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const collapsibleMenus = [
    {
      title: 'Blog',
      icon: SquareChartGantt,
      key: 'blog',
      children: [
        { title: 'All Blogs', url: '/admin/blog/all-blogs' },
        { title: 'Manage Blog', url: '/admin/blog/manage-blog' },
        { title: 'Create Blog', url: '/admin/blog/create-blog' },
      ],
    },
    {
      title: 'Project',
      icon: SquareChartGantt,
      key: 'project',
      children: [
        { title: 'All Projects', url: '/admin/project/all-projects' },
        { title: 'Manage Project', url: '/admin/project/manage-project' },
        { title: 'Create Project', url: '/admin/project/create-project' },
      ],
    },
    {
      title: 'Skill',
      icon: SquareChartGantt,
      key: 'skill',
      children: [
        { title: 'Manage Skill', url: '/admin/skill/manage-skill' },
        { title: 'Create Skill', url: '/admin/skill/create-skill' },
      ],
    },
    {
      title: 'Message',
      icon: SquareChartGantt,
      key: 'message',
      children: [
        { title: 'All Message', url: '/admin/message/all-message' },
        { title: 'Manage Message', url: '/admin/message/manage-message' }
      ],
    },
  ];

  const defaultNav = [
    { title: 'Home', url: '/admin', icon: HomeIcon },
    { title: 'Profile', url: '/admin/profile', icon: UserCog },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className='h-20 w-20 '>
                <Link className='mx-auto' href="/">
                <Image src={logo} alt="logo" className="h-20 w-20  rounded-full" />
              </Link>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain  items={defaultNav} />

        {user?.role === 'ADMIN' && (
          <SidebarMenu>
            {collapsibleMenus.map((menu) => (
              <div key={menu.key}>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => toggleMenu(menu.key)}>
                    <div className="flex justify-between items-center w-full">
                      <span className="flex items-center gap-2">
                        <menu.icon className="w-4 h-4" />
                        {menu.title}
                      </span>
                      {openMenus[menu.key] ? <ChevronDown /> : <ChevronRight />}
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {openMenus[menu.key] &&
                  menu.children.map((child) => (
                    <SidebarMenuItem key={child.url} className="pl-6">
                      <SidebarMenuButton asChild>
                        <Link href={child.url}>{child.title}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
              </div>
            ))}
          </SidebarMenu>
        )}
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
