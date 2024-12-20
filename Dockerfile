# source
# yarn build
# yarn start:prod
# node_modules
# package.json
# yarn install
# node

# yarn , git
FROM node 

WORKDIR /root/nodejs

COPY package.json .
   
RUN yarn config set network-timeout 3000000
RUN yarn install

COPY ./src/prisma ./src/prisma

RUN yarn prisma generate --schema ./src/prisma/schema.prisma
RUN yarn prisma generate --schema ./src/prisma/schema-mysql.prisma

COPY . .

RUN yarn run build

CMD ["yarn","start:prod"]
# docker build . -t img-nest
# docker run -d -p 8888:8080 --name nest-cons --network node-network img-nest