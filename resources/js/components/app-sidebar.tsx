import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

import { Activity, BarChart, BookOpen, Clipboard, Folder, LayoutGrid, Pill, Settings, Users, Users2 } from 'lucide-react';
import AppLogo from './app-logo';

const adminNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Pengguna',
        href: '/users',
        icon: Users2,
    },
    {
        title: 'Pasien',
        href: '/patients',
        icon: Users,
    },
    {
        title: 'Pemeriksaan',
        href: '/examinations',
        icon: Clipboard,
    },
    {
        title: 'Rujukan',
        href: '/referrals',
        icon: Activity,
    },
    {
        title: 'Obat',
        href: '/medicines',
        icon: Pill,
    },
    {
        title: 'Laporan',
        href: '/reports',
        icon: BarChart,
    },
    {
        title: 'Pengaturan',
        href: '/settings',
        icon: Settings,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];
const dokterNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },

    {
        title: 'Pasien',
        href: '/patients',
        icon: Users,
    },
    {
        title: 'Pemeriksaan',
        href: '/examinations',
        icon: Clipboard,
    },
    {
        title: 'Rujukan',
        href: '/referrals',
        icon: Activity,
    },

    {
        title: 'Pengaturan',
        href: '/settings',
        icon: Settings,
    },
];
const apotekerNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },

    {
        title: 'Obat',
        href: '/medicines',
        icon: Pill,
    },
    {
        title: 'Laporan',
        href: '/reports',
        icon: BarChart,
    },
    {
        title: 'Pengaturan',
        href: '/settings',
        icon: Settings,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {auth.user.role === 'admin' && <NavMain items={adminNavItems} />}

                {auth.user.role === 'dokter' && <NavMain items={dokterNavItems} />}
                {auth.user.role === 'apoteker' && <NavMain items={apotekerNavItems} />}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
