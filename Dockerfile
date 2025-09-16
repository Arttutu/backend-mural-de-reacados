FROM node:latest

WORKDIR /usr/src/api

COPY . .
COPY ./.env.prod ./.env

RUN npm install --quiet --no-optional --no-fund --loglevel=error
RUN npx prisma generate
COPY service-account.json ./service-account.json
RUN npm run build
EXPOSE 8080
CMD ["npm", "run", "start:prod"]