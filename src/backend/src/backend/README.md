Setting up db
1. `docker run --name hackharvard2024 -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`
2. `docker exec -ti hackharvard2024 psql -U postgres -c "CREATE DATABASE hackharvard2024;"`
3. `yarn prisma migrate reset`