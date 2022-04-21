FROM node:16 AS builder

COPY ["./code/web/package.json", "./code/web/yarn.lock", "./"]

RUN yarn --production --silent

# app
FROM node:16-alpine

WORKDIR /app
COPY --from=builder /node_modules/ /app/node_modules/
COPY ./code/web .

CMD yarn serve
