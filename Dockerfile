FROM node:18

WORKDIR /home/node40

COPY package*.json .

RUN yarn config set network-timeout 3000000

RUN yarn install

COPY prisma ./prisma
RUN yarn prisma generate


COPY . .

EXPOSE 8080

CMD ["node","src/index.js"]

# docker build . -t img-node

# docker run -d -p 8080:8080 --name cons-node img-node