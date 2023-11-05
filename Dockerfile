FROM nginx

WORKDIR /usr/share/nginx/html

COPY . .

# docker build . -t img-youtube
# docker run -d -p 3000:80 --name cons-youtube img-youtube