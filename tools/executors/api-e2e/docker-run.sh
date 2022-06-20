#!/bin/sh
docker volume prune -f
docker run --name=plantpay-test -e POSTGRES_USER=test -e POSTGRES_PASSWORD=test -e POSTGRES_DB=test --health-cmd='pg_isready -U test' --health-interval='5s' --health-timeout='5s' --health-start-period='20s' -p 5433:5432 -d --rm postgres:13.3

until docker inspect --format "{{json .State.Health.Status }}" plantpay-test| grep -m 1 "healthy"; do sleep 1 ; done
npx prisma db push --schema=libs/prisma/src/prisma/schema.prisma
node libs/prisma/src/seed.js
