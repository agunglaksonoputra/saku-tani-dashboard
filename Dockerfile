FROM node:18

WORKDIR /app


ARG ENV_FILE=.env

COPY . .

COPY ${ENV_FILE} .env

RUN npm install

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "dist", "-l", "3015"]