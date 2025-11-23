FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm i

RUN npm run tsc

USER node

CMD ["npm", "run", "start"]