FROM node:21.6.2-alpine

RUN apk add --no-cache \
  build-base \
  git \
  vips-dev \
  curl

WORKDIR /consumy-app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5174

CMD ["npm", "run", "dev", "--", "--host"]
