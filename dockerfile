FROM node:21-alpine3.17 as build

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

FROM nginx:1.21-alpine as prod

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
