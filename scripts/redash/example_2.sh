# Environment configuration for security
REDASH_ENFORCE_HTTPS=true
REDASH_COOKIE_SECRET=$(openssl rand -hex 32)
REDASH_SECRET_KEY=$(openssl rand -hex 32)
REDASH_PASSWORD_LOGIN_ENABLED=false
REDASH_GOOGLE_CLIENT_ID=your-google-client-id
REDASH_GOOGLE_CLIENT_SECRET=your-google-secret

# Restrict data source access
REDASH_FEATURE_ALLOW_ALL_TO_EDIT_PUBLISHED_QUERIES=false