# Nginx CSP headers for D3 applications
add_header Content-Security-Policy "
  default-src 'self';
  script-src 'self' 'unsafe-eval' https://d3js.org;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob:;
  connect-src 'self' wss: https:;
" always;