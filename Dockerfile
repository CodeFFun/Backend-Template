FROM node:21

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

ENV PORT=8080

EXPOSE 8080

CMD [ "pnpm", "start" ]