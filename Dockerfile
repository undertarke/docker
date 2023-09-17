FROM nginx

WORKDIR /usr/share/nginx/html

COPY . .


# docker build ./build -t img-react
# docker run -d -p 3100:80 --name cons-react img-react 