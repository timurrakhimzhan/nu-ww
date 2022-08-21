FROM node:16-slim AS base

RUN apt-get update
RUN apt-get install -y openssl

WORKDIR /app

COPY package.json ./
RUN npm install --legacy-peer-deps

COPY prisma ./
RUN npx prisma generate

COPY . .

FROM base as prod
RUN npm run build
CMD ["npm", "run", "start"]


