# Create project directory
mkdir cube-analytics && cd cube-analytics

# Create docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  cube:
    image: cubejs/cube:latest
    ports:
      - 4000:4000
      - 15432:15432  # SQL API
    environment:
      CUBEJS_DEV_MODE: "true"
      CUBEJS_DB_TYPE: postgres
      CUBEJS_DB_HOST: postgres
      CUBEJS_DB_NAME: analytics
      CUBEJS_DB_USER: cube
      CUBEJS_DB_PASS: cube_password
      CUBEJS_API_SECRET: your-secret-key-here
    volumes:
      - ./schema:/cube/conf/schema
    depends_on:
      - postgres

  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: analytics
      POSTGRES_USER: cube
      POSTGRES_PASSWORD: cube_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql

volumes:
  postgres_data:
EOF

# Start services
docker-compose up -d