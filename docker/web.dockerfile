FROM node:16-alpine AS builder

COPY ./package.json ./

RUN npm install

# app
FROM node:16-alpine

WORKDIR /app
COPY --from=builder /node_modules/ /app/node_modules/
COPY . .

CMD ["npm", "run", "dev"]
