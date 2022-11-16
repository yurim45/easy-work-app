# vue build 
FROM node:16-alpine as builder
WORKDIR /app
COPY package*.json ./

RUN npm install
COPY ./ ./
RUN npm run build


# nginx web server
FROM nginx:1.18.0

# 도커 컨테이너 내에서 실행되고 있는 nginx의 설정을 모두 지운다.
RUN rm -rf /etc/nginx/conf.d/default.conf
# 그리고 내가 설정한 default.conf를 설정 디렉토리내에 복사시켜준다.
COPY --from=builder /app/nginx/default.conf /etc/nginx/conf.d/default.conf

# nginx html 디렉토리 내 모든 파일(html)을 제거한다.
RUN rm -rf /usr/share/nginx/html/*
# vue dist (static)을 html 폴더내에 복사시켜준다.
COPY --from=builder /app/dist /usr/share/nginx/html/