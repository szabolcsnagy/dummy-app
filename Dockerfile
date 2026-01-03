FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3000

ENV PORT=3000
ENV APP_MESSAGE="Hello from the dummy app dockerized!"
ENV BG_COLOR=white

CMD ["npm", "start"]
