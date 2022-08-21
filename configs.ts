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
    PARTICIPANT_MODERATOR: 'PARTICIPANT_MODERATOR'
}

const NODE_ENV = process.env.NODE_ENV || 'development'

const TRPC_URL = process.env.TRPC_URL || 'http://localhost:3000';

const SSL = process.env.SSL || 'false';


export const appConfigs: {
    NODE_ENV: string;
    TRPC_URL: string;
    SSL: string;
} = {
    NODE_ENV,
    TRPC_URL,
    SSL
}

console.log(process.env.TRPC_URL, process.env.TRPC_URL || 'http://localhost:3000', appConfigs, 'app configs')