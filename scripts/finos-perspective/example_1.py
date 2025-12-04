# server.py
import asyncio
import perspective
from perspective import Table, PerspectiveManager, PerspectiveTornadoHandler
import tornado.web
import tornado.ioloop
import pandas as pd
from datetime import datetime
import random

class TradingDataServer:
    def __init__(self):
        self.manager = PerspectiveManager()
        self.tables = {}

    def create_tables(self):
        # Create schema
        schema = {
            "trade_id": str,
            "symbol": str,
            "side": str,
            "price": float,
            "quantity": int,
            "value": float,
            "timestamp": datetime,
            "exchange": str
        }

        # Create table with 1M row limit
        self.tables["trades"] = Table(schema, limit=1_000_000)
        self.manager.host_table("trades", self.tables["trades"])

    async def generate_data(self):
        symbols = ["AAPL", "GOOGL", "MSFT", "AMZN", "META", "TSLA"]
        exchanges = ["NYSE", "NASDAQ", "BATS"]
        trade_id = 0

        while True:
            trades = []
            for _ in range(100):  # Batch of 100 trades
                trade_id += 1
                symbol = random.choice(symbols)
                price = 100 + random.random() * 400
                quantity = random.randint(1, 1000)

                trades.append({
                    "trade_id": f"TRD{trade_id:010d}",
                    "symbol": symbol,
                    "side": random.choice(["BUY", "SELL"]),
                    "price": round(price, 2),
                    "quantity": quantity,
                    "value": round(price * quantity, 2),
                    "timestamp": datetime.now(),
                    "exchange": random.choice(exchanges)
                })

            # Update table
            self.tables["trades"].update(trades)
            await asyncio.sleep(0.1)  # 1000 trades/second

def make_app(manager):
    return tornado.web.Application([
        (
            r"/websocket",
            PerspectiveTornadoHandler,
            {"manager": manager, "check_origin": True}
        ),
        (
            r"/(.*)",
            tornado.web.StaticFileHandler,
            {"path": "./public", "default_filename": "index.html"}
        )
    ])

async def main():
    server = TradingDataServer()
    server.create_tables()

    app = make_app(server.manager)
    app.listen(8080)
    print("Server running on http://localhost:8080")

    # Start data generation
    await server.generate_data()

if __name__ == "__main__":
    asyncio.run(main())