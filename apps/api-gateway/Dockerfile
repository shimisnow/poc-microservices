FROM poc-microservices:latest as base

WORKDIR /app
COPY . .
RUN npx nx build api-gateway

##########
FROM poc-microservices:latest

WORKDIR /app
COPY --from=base /app/dist/apps/api-gateway/main.js ./
ENV NODE_ENV="production"

CMD ["node", "main.js"]
