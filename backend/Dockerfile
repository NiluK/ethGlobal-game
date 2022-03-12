FROM node:14

WORKDIR /usr/src/app

RUN npm i -g @nestjs/cli

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]