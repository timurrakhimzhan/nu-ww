import {Session} from "next-auth";

export const MENU = [
    {
        label: 'About',
        path: '/',
        iconPath: '/assets/icons/about.svg',
        isVisible: (session: Session) => session
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

console.log(GOOGLE_AUTH_CREDENTIALS, 'hello world');

export const ROLES = {
    PARTICIPANT: 'PARTICIPANT',
    MODERATOR: 'MODERATOR',
    PARTICIPANT_MODERATOR: 'PARTICIPANT_MODERATOR'
}

export const NODE_ENV = process.env.NODE_ENV || 'development'