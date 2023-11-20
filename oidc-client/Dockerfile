FROM node:18.18.2

WORKDIR /oidc-client

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV NODE_OPTIONS=--openssl-legacy-provider

CMD [ "npm", "start" ]
