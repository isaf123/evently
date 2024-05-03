import { Icon } from "@iconify/react";

import { SideNavItem } from "./types";

export const SIDENAV_ITEMS: SideNavItem[] = [
    {
        title: 'Dashboard',
        path: '/event-organizer/dashboard',
        icon: <Icon icon="lucide:home" width="24" height="24" />,
    },
    {
        title: 'Settings',
        path: '/event-organizer/settings',
        icon: <Icon icon="lucide:settings" width="24" height="24" />,
        submenu: true,
        subMenuItems: [

            { title: 'Voucher', path: '/event-organizer/settings/voucher' },
            { title: 'Customers', path: '/event-organizer/settings/customer' },
        ]
    },
    {
        title: 'Events',
        path: '/event-organizer/events',
        icon: <Icon icon="ic:outline-event" width="24" height="24" />,
    },
    {
        title: 'Transactions',
        path: '/event-organizer/transactions',
        icon: <Icon icon="uil:transaction" width="24" height="24" />,
    },
];