# Use TLS and authentication tokens
client = flight.connect(
    "grpc+tls://server:8815",
    tls_root_certs=cert_data
)