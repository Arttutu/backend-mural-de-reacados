FROM node:latest

WORKDIR /usr/src/api

COPY . .
COPY ./.env.prod ./.env

RUN npm install --quiet --no-optional --no-fund --loglevel=error
RUN npx prisma generate
RUN npm run build

CMD ["npm", "run", "start:prod"]