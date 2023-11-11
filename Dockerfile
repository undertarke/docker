FROM node:16

WORKDIR /usr/node34_backend

COPY package*.json ./

RUN yarn install

COPY prisma ./prisma

RUN yarn prisma generate

COPY . .

EXPOSE 8080

CMD ["node" , "src/index.js"]

 

# docker build . -t img-node

# docker run -d -p 8080:8080 --name cons-node img-node