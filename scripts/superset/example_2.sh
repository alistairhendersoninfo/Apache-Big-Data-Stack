# Clone repository
git clone https://github.com/apache/superset.git
cd superset

# Start with Docker Compose
docker compose -f docker-compose-non-dev.yml up -d

# Access at http://localhost:8088
# Default credentials: admin/admin