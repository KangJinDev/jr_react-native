FROM arm32v7/node:lts-alpine
WORKDIR /app
COPY . .
RUN apk add --no-cache --virtual .gyp \
    python \
    make \
    g++ \
    && yarn ci --network-timeout 60000 \
    && apk del .gyp
CMD yarn migrate && yarn start
EXPOSE 3001
