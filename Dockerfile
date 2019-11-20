FROM nginx:alpine
COPY ./lib /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf
