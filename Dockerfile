# cài nodejs
FROM node:16

# => for M1 rich kick
#FROM --platform=linux/arm64 torizon/debian:2-bullseye  

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY prisma/schema.prisma prisma/

# Generate the Prisma client
RUN npx prisma generate

COPY . .

EXPOSE 8080

CMD ["node","index.js"]
