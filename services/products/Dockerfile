FROM node:24-alpine

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3002

CMD ["node", "app.ts"]
