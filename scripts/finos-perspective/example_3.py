# server.py - Secure WebSocket handler
from perspective import PerspectiveTornadoHandler
import tornado.web

class SecurePerspectiveHandler(PerspectiveTornadoHandler):
    def check_origin(self, origin):
        # Only allow specific origins
        allowed_origins = [
            "https://dashboard.example.com",
            "http://localhost:3000"
        ]
        return origin in allowed_origins

    async def open(self):
        # Authenticate connection
        token = self.get_argument("token", None)
        if not self.validate_token(token):
            self.close(code=4001, reason="Unauthorized")
            return
        await super().open()

    def validate_token(self, token):
        # Implement token validation
        return token is not None and len(token) > 0