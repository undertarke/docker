FROM node:16

WORKDIR /usr/src/app

COPY package*.json .

RUN yarn install --legacy-peer-deps

COPY prisma ./prisma/
RUN yarn prisma generate

COPY . .

#private port sẽ chạy
EXPOSE 8080

# node index.js => khởi chạy server
CMD ["node","index.js"]

# docker run -d -p 80:80 -e PASS=1234 -e DATABASE_URL=mysql://root:1234@mysql_db:3306/db_food?schema=public --name abc imageabc