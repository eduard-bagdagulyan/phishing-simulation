FROM node:latest AS builder

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build

RUN npm prune --omit=dev

FROM gcr.io/distroless/nodejs20-debian12

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json .
COPY --from=builder /app/node_modules ./node_modules

CMD ["dist/main.js"]
