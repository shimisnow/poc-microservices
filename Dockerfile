FROM node:19.6-alpine3.16

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i
