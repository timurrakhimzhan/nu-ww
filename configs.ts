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


export const GOOGLE_AUTH_CREDENTIALS = {
    clientId: process.env.GOOGLE_ID as string,
    clientSecret: process.env.GOOGLE_SECRET as string,
}

export const ROLES = {
    PARTICIPANT: 'PARTICIPANT',
    MODERATOR: 'MODERATOR',
    PARTICIPANT_MODERATOR: 'PARTICIPANT_MODERATOR',
    TESTER: 'TESTER',
    BANNED: 'BANNED'
}

const NODE_ENV = process.env.NODE_ENV || 'development'

const SSL = process.env.SSL || 'false';


export const appConfigs: {
    NODE_ENV: string;
    SSL: string;
} = {
    NODE_ENV,
    SSL
}