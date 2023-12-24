# cài đặt ứng dụng trên mạng
FROM nginx

# đường dẫn làm việc trên máy ảo container
WORKDIR /usr/share/nginx/html

# copy hết tất cả các file từ máy vào máy ảo container
COPY   .   .

# docker build . -t img-html

# docker run -d -p 3030:80 --name cons-html img-html
