# Security environment variables
MB_ENCRYPTION_SECRET_KEY=$(openssl rand -hex 32)
MB_PASSWORD_COMPLEXITY=strong
MB_PASSWORD_LENGTH=12
MB_SESSION_COOKIES=true
MB_COOKIE_SAMESITE=strict

# LDAP/SSO configuration
MB_LDAP_ENABLED=true
MB_LDAP_HOST=ldap.example.com
MB_LDAP_SECURITY=ssl

# Disable public sharing if not needed
MB_ENABLE_PUBLIC_SHARING=false
MB_ENABLE_EMBEDDING=true
MB_EMBEDDING_SECRET_KEY=$(openssl rand -hex 32)