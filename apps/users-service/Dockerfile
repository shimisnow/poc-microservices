FROM poc-microservices:latest as base

WORKDIR /app
COPY . .
RUN npx nx build users-service

##########
FROM poc-microservices:latest

WORKDIR /app
COPY --from=base /app/dist/apps/users-service/main.js ./
ENV NODE_ENV="production"

CMD ["node", "main.js"]
