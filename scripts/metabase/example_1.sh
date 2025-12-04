# Quick start with Docker
docker run -d \
  --name metabase \
  -p 3000:3000 \
  -v metabase-data:/metabase.db \
  metabase/metabase:latest

# Production with external database
cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  metabase:
    image: metabase/metabase:latest
    ports:
      - 3000:3000
    environment:
      MB_DB_TYPE: postgres
      MB_DB_HOST: postgres
      MB_DB_PORT: 5432
      MB_DB_DBNAME: metabase
      MB_DB_USER: metabase
      MB_DB_PASS: metabase_password
      MB_ENCRYPTION_SECRET_KEY: your-secret-key
    depends_on:
      - postgres

  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: metabase
      POSTGRES_USER: metabase
      POSTGRES_PASSWORD: metabase_password
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
EOF

docker-compose up -d