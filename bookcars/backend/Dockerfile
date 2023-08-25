# syntax=docker/dockerfile:1

FROM node:18-alpine as build
WORKDIR /backend
COPY . .
COPY ./.env.example ./.env
RUN npm install
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /backend/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 3001
