FROM node:16

WORKDIR /usr/node39

COPY package.json .

RUN yarn install

COPY . . 

EXPOSE 8080

CMD ["node", "./src/index.js"]