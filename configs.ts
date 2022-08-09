export const MENU = [
    {
        label: 'About',
        path: '/',
        iconPath: '/assets/icons/about.svg'
    },
    {
        label: 'Events calendar',
        path: '/events-calendar',
        iconPath: '/assets/icons/calendar.svg'
    },
    {
        label: 'Tokens Leaderboard',
        path: '/leaderboard',
        iconPath: '/assets/icons/leaderboard.svg'
    },
];

export const JWT_SECRET=process.env.JWT_SECRET || '';