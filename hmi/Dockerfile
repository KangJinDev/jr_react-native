FROM arm32v7/node:lts AS builder
WORKDIR /app
COPY . .
ADD nginx.conf default.conf
RUN yarn ci --production --network-timeout 60000
RUN yarn build

FROM arm32v7/nginx:mainline-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./* && rm /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build .
COPY --from=builder /app/default.conf /etc/nginx/conf.d/
ENTRYPOINT ["nginx", "-g", "daemon off;"]
