FROM node:14 as build
RUN apt update
WORKDIR /app
COPY src/ src/
COPY public public/
COPY package.json .
COPY package-lock.json .
RUN ls -la

RUN npm i && npm run build

FROM nginx:1.19.1-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY ./target/ /etc/nginx/
