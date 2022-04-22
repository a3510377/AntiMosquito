FROM node:16 AS builder

COPY ["./code/rearEndv2/package.json", "./code/rearEndv2/yarn.lock", "./"]

RUN yarn --production --silent

# app
FROM node:16-alpine

WORKDIR /app
COPY --from=builder /node_modules/ /app/node_modules/
COPY ./code/rearEndv2 .

CMD npm run start
