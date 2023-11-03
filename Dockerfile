FROM node:16

WORKDIR /usr/app

COPY package*.json .

RUN yarn install

# setup voi prisma
COPY prisma ./prisma/
RUN yarn prisma generate 

COPY ./ ./

EXPOSE 8080

CMD ["node", "src/index.js"]

# docker build . -t img-node

# docker run -d -p 8080:8080 --name cons-node -e DB_HOST=139.59.127.130 -e DB_DATABASE=db_youtube -e DB_USERNAME=root -e DB_PASS=1234 DB_PORT=3306 -e DB_DIALECT=mysql -e DATABASE_URL=mysql://root:1234@139.59.127.130:3306/db_youtube img-node

