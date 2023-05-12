FROM nginx

WORKDIR /usr/share/nginx/html

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y git

COPY . .