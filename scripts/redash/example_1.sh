# Docker Compose installation
git clone https://github.com/getredash/setup.git
cd setup
docker-compose up -d

# Or manual Docker setup
cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  redash:
    image: redash/redash:latest
    command: server
    ports:
      - 5000:5000
    environment:
      REDASH_DATABASE_URL: postgresql://redash:redash@postgres/redash
      REDASH_REDIS_URL: redis://redis:6379/0
      REDASH_SECRET_KEY: your-secret-key
    depends_on:
      - postgres
      - redis

  worker:
    image: redash/redash:latest
    command: scheduler
    environment:
      REDASH_DATABASE_URL: postgresql://redash:redash@postgres/redash
      REDASH_REDIS_URL: redis://redis:6379/0

  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: redash
      POSTGRES_PASSWORD: redash

  redis:
    image: redis:7-alpine
EOF

docker-compose up -d
docker-compose run --rm redash create_db