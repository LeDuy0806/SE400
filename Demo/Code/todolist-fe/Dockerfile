# Stage 1: build
FROM node:20-bookworm-slim AS build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

# Stage 2: Create image and run with nginx
FROM nginx:alpine

RUN apk add --no-cache gettext

COPY nginx/nginx.conf /etc/nginx/nginx.conf.template

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["sh", "-c", "envsubst '${API_URL}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"]
