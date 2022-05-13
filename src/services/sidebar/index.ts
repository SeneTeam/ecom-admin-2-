import {ISidebar} from '../../types/services/sidebar.types';



export const SUPER_USER_SIDEBAR: ISidebar[] = [
    {
        id: 1,
        link: '/dashboard/employees',
        name: 'Žmonių valdymas',
        subItems: [
            [
                { 
                    id: 11,
                    link: '/dashboard/employees',
                    name: 'Darbuotojai',
                    icon: 'dashboard-icon.svg'
                }
            ],
            [
                {
                    id: 12,
                    link: '/dashboard/employees/timesheet',
                    name: 'Bendras tabelis',
                    icon: 'menu-icon.svg'
                },
                {
                    id: 13,
                    link: '/dashboard/employees/timesheet/summary',
                    name: 'Suvestinė',
                    icon: 'file-icon.svg'
                },
            ],
            [
                {
                    id: 14,
                    link: '/dashboard/accomodations',
                    name: 'Apgyvendinimas',
                    icon: 'bed-icon.svg'
                },
                {
                    id: 15,
                    link: '/dashboard/equipments',
                    name: 'Darbo priemonės',
                    icon: 'tools-icon.svg'
                },
                {
                    id: 16,
                    link: '/dashboard/vehicles',
                    name: 'Automobiliai',
                    icon: 'car-icon.svg'
                },
                {
                    id: 17,
                    name: 'Nustatymai',
                    
                    icon: 'toogle-icon.svg',
                    nestedItems: [
                        { id: 171, link: '/dashboard/users', name: 'Vartotojai' },
                        { id: 172, link: '/dashboard/employee-roles', name: 'Pareigos' },
                        { id: 173, link: '/dashboard/assignment-countries', name: 'Komandiruočių šalys' },
                        { id: 174, link: '/dashboard/clothings', name: 'Avalynės ir aprangos dydžiai' }
                    ]
                },
            ],
        ]
    },
    {
        id: 2,
        link: '/dashboard/warehouses',
        name: 'Sandėlio valdymas',
        subItems: [
            [
                { 
                    id: 21,
                    link: '/dashboard/warehouses',
                    name: 'Sandėliai',
                    icon: 'warehouse-icon.svg'
                }
            ],
        ]
    },
    {
        id: 3,
        link: '/dashboard/employees',
        name: 'Resursai'
    },
    {
        id: 4,
        link: '/dashboard/employees',
        name: 'Pardavimai'
    }
]


export const ADMIN_SIDEBAR: ISidebar[] = [
    {
        id: 1,
        link: '/dashboard/employees',
        name: 'Žmonių valdymas',
        subItems: [
            [
                { 
                    id: 11,
                    link: '/dashboard/employees',
                    name: 'Darbuotojai',
                    icon: 'dashboard-icon.svg'
                }
            ],
            [
                {
                    id: 12,
                    link: '/dashboard/employees/timesheet',
                    name: 'Bendras tabelis',
                    icon: 'menu-icon.svg'
                },
                {
                    id: 13,
                    link: '/dashboard/employees/timesheet/summary',
                    name: 'Suvestinė',
                    icon: 'file-icon.svg'
                },
            ],
            [
                {
                    id: 14,
                    link: '/dashboard/accomodations',
                    name: 'Apgyvendinimas',
                    icon: 'bed-icon.svg'
                },
                {
                    id: 15,
                    link: '/dashboard/equipments',
                    name: 'Darbo priemonės',
                    icon: 'tools-icon.svg'
                },
                {
                    id: 16,
                    link: '/dashboard/vehicles',
                    name: 'Automobiliai',
                    icon: 'car-icon.svg'
                },
                {
                    id: 17,
                    name: 'Nustatymai',
                    
                    icon: 'toogle-icon.svg',
                    nestedItems: [
                        { id: 171, link: '/dashboard/users', name: 'Vartotojai' },
                        { id: 172, link: '/dashboard/employee-roles', name: 'Pareigos' },
                        { id: 173, link: '/dashboard/assignment-countries', name: 'Komandiruočių šalys' },
                        { id: 174, link: '/dashboard/clothings', name: 'Avalynės ir aprangos dydžiai' }
                    ]
                },
            ],
        ]
    },
    {
        id: 2,
        link: '/dashboard/warehouses',
        name: 'Sandėlio valdymas',
        subItems: [
            [
                { 
                    id: 21,
                    link: '/dashboard/warehouses',
                    name: 'Sandėliai',
                    icon: 'warehouse-icon.svg'
                }
            ],
        ]
    },
    {
        id: 3,
        link: '/dashboard/employees',
        name: 'Resursai'
    },
    {
        id: 4,
        link: '/dashboard/employees',
        name: 'Pardavimai'
    },
    {
        id: 5,
        link: '/dashboard/employees',
        name: 'Admino Nustatymai',
        
    },
]


export const SYSTEM_ADMIN_SIDEBAR: ISidebar[] = [
    {
        id: 1,
        link: '/dashboard/employees',
        name: 'Žmonių valdymas',
        subItems: [
            [
                { 
                    id: 11,
                    link: '/dashboard/employees',
                    name: 'Darbuotojai',
                    icon: 'dashboard-icon.svg'
                }
            ],
            [
                {
                    id: 12,
                    link: '/dashboard/employees/timesheet',
                    name: 'Bendras tabelis',
                    icon: 'menu-icon.svg'
                },
                {
                    id: 13,
                    link: '/dashboard/employees/timesheet/summary',
                    name: 'Suvestinė',
                    icon: 'file-icon.svg'
                },
            ],
            [
                {
                    id: 14,
                    link: '/dashboard/accomodations',
                    name: 'Apgyvendinimas',
                    icon: 'bed-icon.svg'
                },
                {
                    id: 15,
                    link: '/dashboard/equipments',
                    name: 'Darbo priemonės',
                    icon: 'tools-icon.svg'
                },
                {
                    id: 16,
                    link: '/dashboard/vehicles',
                    name: 'Automobiliai',
                    icon: 'car-icon.svg'
                },
                {
                    id: 17,
                    name: 'Nustatymai',
                    
                    icon: 'toogle-icon.svg',
                    nestedItems: [
                        { id: 171, link: '/dashboard/users', name: 'Vartotojai' },
                        { id: 172, link: '/dashboard/employee-roles', name: 'Pareigos' },
                        { id: 173, link: '/dashboard/assignment-countries', name: 'Komandiruočių šalys' },
                        { id: 174, link: '/dashboard/clothings', name: 'Avalynės ir aprangos dydžiai' }
                    ]
                },
            ],
        ]
    },
    {
        id: 2,
        link: '/dashboard/warehouses',
        name: 'Sandėlio valdymas',
        subItems: [
            [
                { 
                    id: 21,
                    link: '/dashboard/warehouses',
                    name: 'Sandėliai',
                    icon: 'warehouse-icon.svg'
                }
            ],
        ]
    },
    {
        id: 3,
        link: '/dashboard/employees',
        name: 'Resursai'
    },
    {
        id: 4,
        link: '/dashboard/employees',
        name: 'Pardavimai'
    },
    {
        id: 5,
        link: '/dashboard/employees',
        name: 'Admino Nustatymai',
        
    },
]

export const GUEST_SIDEBAR: ISidebar[] = [
    {
        id: 1,
        link: '/dashboard/employees',
        name: 'Žmonių valdymas',
        subItems: [
            [
                { 
                    id: 11,
                    link: '/dashboard/employees',
                    name: 'Darbuotojai',
                    icon: 'dashboard-icon.svg'
                }
            ],
            [
                {
                    id: 12,
                    link: '/dashboard/employees',
                    name: 'Bendras tabelis',
                    icon: 'menu-icon.svg'
                },
                {
                    id: 13,
                    link: '/dashboard/employees',
                    name: 'Suvestinė',
                    icon: 'file-icon.svg'
                },
            ],
            [
                {
                    id: 14,
                    link: '/dashboard/employees',
                    name: 'Apgyvendinimas',
                    icon: 'bed-icon.svg'
                },
                {
                    id: 15,
                    link: '/dashboard/employees',
                    name: 'Darbo priemonės',
                    icon: 'tools-icon.svg'
                },
                {
                    id: 16,
                    link: '/dashboard/employees',
                    name: 'Automobiliai',
                    icon: 'car-icon.svg'
                }
            ],
        ]
    },
    {
        id: 2,
        link: '/dashboard/employees',
        name: 'Ištekliai'
    },
    {
        id: 3,
        link: '/dashboard/employees',
        name: 'Resursai'
    },
    {
        id: 4,
        link: '/dashboard/employees',
        name: 'Pardavimai'
    },
]

export const USER_SIDEBAR: ISidebar[] = [
    {
        id: 1,
        link: '/dashboard/employees',
        name: 'Žmonių valdymas',
        subItems: [
            [
                { 
                    id: 11,
                    link: '/dashboard/employees',
                    name: 'Darbuotojai',
                    icon: 'dashboard-icon.svg'
                }
            ],
            [
                {
                    id: 12,
                    link: '/dashboard/employees',
                    name: 'Bendras tabelis',
                    icon: 'menu-icon.svg'
                },
                {
                    id: 13,
                    link: '/dashboard/employees',
                    name: 'Suvestinė',
                    icon: 'file-icon.svg'
                },
            ],
            [
                {
                    id: 14,
                    link: '/dashboard/employees',
                    name: 'Apgyvendinimas',
                    icon: 'bed-icon.svg'
                },
                {
                    id: 15,
                    link: '/dashboard/employees',
                    name: 'Darbo priemonės',
                    icon: 'tools-icon.svg'
                },
                {
                    id: 16,
                    link: '/dashboard/employees',
                    name: 'Automobiliai',
                    icon: 'car-icon.svg'
                }
            ],
        ]
    },
    {
        id: 2,
        link: '/dashboard/employees',
        name: 'Ištekliai'
    },
    {
        id: 3,
        link: '/dashboard/employees',
        name: 'Resursai'
    },
    {
        id: 4,
        link: '/dashboard/employees',
        name: 'Pardavimai'
    },
]

