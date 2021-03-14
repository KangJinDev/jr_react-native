FROM node:latest
RUN echo "deb http://ftp.debian.org/debian/ stretch main" >> /etc/apt/sources.list
RUN apt-get update && apt-get install -y wireless-tools sshpass
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
RUN npm install --production
COPY . .
RUN mkdir ~/.ssh && touch ~/.ssh/known_hosts
RUN ssh-keyscan -Ht rsa 127.0.0.1 >> ~/.ssh/known_hosts
CMD ["npm", "start"]