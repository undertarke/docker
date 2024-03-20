FROM node:16

WORKDIR /usr/node39

COPY package.json .
COPY prisma ./prisma/

RUN yarn install

RUN yarn prisma generate

COPY . . 

EXPOSE 8080

CMD ["node", "./src/index.js"]