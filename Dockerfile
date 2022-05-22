FROM node:16-alpine

RUN apk add python3

WORKDIR /mark-safe

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build
WORKDIR /mark-safe/build

EXPOSE 3000
CMD python3 -m http.server 3000