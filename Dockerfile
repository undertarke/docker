# npm run build
# yarn run build

FROM nginx
WORKDIR /usr/share/nginx/html

COPY . .


# docker build . -t img-react
# docker run -d -p 3000:80 --name cons-react img-react