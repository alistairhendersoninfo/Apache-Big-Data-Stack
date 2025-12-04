# Create new Cube project
npx cubejs-cli create analytics-api -d postgres

# Navigate to project
cd analytics-api

# Configure environment
cat > .env << 'EOF'
CUBEJS_DEV_MODE=true
CUBEJS_DB_TYPE=postgres
CUBEJS_DB_HOST=localhost
CUBEJS_DB_PORT=5432
CUBEJS_DB_NAME=analytics
CUBEJS_DB_USER=cube
CUBEJS_DB_PASS=cube_password
CUBEJS_API_SECRET=your-256-bit-secret
CUBEJS_EXTERNAL_DEFAULT=true
CUBEJS_SCHEDULED_REFRESH_DEFAULT=true
EOF

# Install dependencies
npm install

# Start development server
npm run dev