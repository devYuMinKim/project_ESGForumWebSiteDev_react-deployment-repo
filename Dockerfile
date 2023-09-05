# build stage
FROM node:18-alpine AS builder

RUN apk update

WORKDIR /app

COPY . .

RUN yarn install

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL $REACT_APP_API_URL

RUN yarn build

# production stage
FROM nginx:1.24.0

COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]