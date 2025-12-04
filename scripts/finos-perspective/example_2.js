// src/index.js
import perspective from "@finos/perspective";
import "@finos/perspective-viewer";
import "@finos/perspective-viewer-datagrid";
import "@finos/perspective-viewer-d3fc";

// Import styles
import "@finos/perspective-viewer/dist/css/pro.css";

// Define schemas
const PRICE_SCHEMA = {
  symbol: "string",
  bid: "float",
  ask: "float",
  last: "float",
  change: "float",
  changePercent: "float",
  volume: "integer",
  timestamp: "datetime"
};

const ORDER_SCHEMA = {
  symbol: "string",
  side: "string",
  price: "float",
  quantity: "integer",
  total: "float",
  timestamp: "datetime"
};

const TRADE_SCHEMA = {
  tradeId: "string",
  symbol: "string",
  side: "string",
  price: "float",
  quantity: "integer",
  value: "float",
  timestamp: "datetime",
  exchange: "string"
};

class TradingDashboard {
  constructor() {
    this.tables = {};
    this.viewers = {};
    this.worker = perspective.worker();
    this.symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'META', 'TSLA', 'NVDA', 'JPM'];
  }

  async init() {
    // Create tables
    this.tables.prices = await this.worker.table(PRICE_SCHEMA, { index: "symbol" });
    this.tables.orderbook = await this.worker.table(ORDER_SCHEMA);
    this.tables.trades = await this.worker.table(TRADE_SCHEMA, { limit: 10000 });

    // Initialize viewers
    await this.initPriceViewer();
    await this.initOrderBookViewer();
    await this.initTradeViewer();

    // Start data streams
    this.startPriceStream();
    this.startOrderStream();
    this.startTradeStream();
  }

  async initPriceViewer() {
    const viewer = document.getElementById("prices");
    this.viewers.prices = viewer;

    await viewer.load(this.tables.prices);

    await viewer.restore({
      plugin: "Datagrid",
      columns: ["symbol", "last", "change", "changePercent", "bid", "ask", "volume"],
      sort: [["volume", "desc"]],
      plugin_config: {
        columns: {
          change: {
            color_mode: "bar",
            pos_color: "#4caf50",
            neg_color: "#f44336"
          },
          changePercent: {
            color_mode: "foreground",
            pos_color: "#4caf50",
            neg_color: "#f44336"
          }
        }
      },
      theme: "Pro Dark"
    });
  }

  async initOrderBookViewer() {
    const viewer = document.getElementById("orderbook");
    this.viewers.orderbook = viewer;

    await viewer.load(this.tables.orderbook);

    await viewer.restore({
      plugin: "Y Bar",
      group_by: ["price"],
      split_by: ["side"],
      columns: ["quantity"],
      aggregates: { quantity: "sum" },
      filter: [["symbol", "==", "AAPL"]],
      sort: [["price", "desc"]],
      theme: "Pro Dark"
    });

    // Enable cross-filtering
    viewer.addEventListener("perspective-click", (event) => {
      const { config, row } = event.detail;
      if (row && row.symbol) {
        this.filterBySymbol(row.symbol);
      }
    });
  }

  async initTradeViewer() {
    const viewer = document.getElementById("trades");
    this.viewers.trades = viewer;

    await viewer.load(this.tables.trades);

    await viewer.restore({
      plugin: "Datagrid",
      columns: ["timestamp", "tradeId", "symbol", "side", "price", "quantity", "value", "exchange"],
      sort: [["timestamp", "desc"]],
      plugin_config: {
        columns: {
          side: {
            color_mode: "foreground",
            pos_color: "#4caf50",
            neg_color: "#f44336"
          },
          value: {
            number_color_mode: "bar"
          }
        }
      },
      theme: "Pro Dark"
    });
  }

  filterBySymbol(symbol) {
    this.viewers.orderbook.restore({
      filter: [["symbol", "==", symbol]]
    });
  }

  startPriceStream() {
    // Simulate real-time price updates
    const baseprices = new Map(
      this.symbols.map(s => [s, 100 + Math.random() * 400])
    );

    setInterval(() => {
      const updates = this.symbols.map(symbol => {
        const base = baseprices.get(symbol);
        const change = (Math.random() - 0.5) * 2;
        const newPrice = base + change;
        baseprices.set(symbol, newPrice);

        const spread = newPrice * 0.001;
        return {
          symbol,
          bid: newPrice - spread,
          ask: newPrice + spread,
          last: newPrice,
          change: change,
          changePercent: (change / base) * 100,
          volume: Math.floor(Math.random() * 1000000),
          timestamp: new Date()
        };
      });

      this.tables.prices.update(updates);
    }, 100);  // 10 updates per second
  }

  startOrderStream() {
    setInterval(() => {
      const orders = [];
      const symbol = this.symbols[Math.floor(Math.random() * this.symbols.length)];
      const midPrice = 150 + Math.random() * 50;

      // Generate order book levels
      for (let i = 0; i < 10; i++) {
        // Bid side
        orders.push({
          symbol,
          side: "BID",
          price: Math.round((midPrice - i * 0.1) * 100) / 100,
          quantity: Math.floor(Math.random() * 1000) + 100,
          total: 0,
          timestamp: new Date()
        });

        // Ask side
        orders.push({
          symbol,
          side: "ASK",
          price: Math.round((midPrice + i * 0.1) * 100) / 100,
          quantity: Math.floor(Math.random() * 1000) + 100,
          total: 0,
          timestamp: new Date()
        });
      }

      // Calculate totals
      orders.forEach(o => { o.total = o.price * o.quantity; });

      this.tables.orderbook.replace(orders);
    }, 500);
  }

  startTradeStream() {
    const exchanges = ['NYSE', 'NASDAQ', 'BATS', 'IEX'];
    let tradeCounter = 0;

    setInterval(() => {
      const symbol = this.symbols[Math.floor(Math.random() * this.symbols.length)];
      const price = 100 + Math.random() * 400;
      const quantity = Math.floor(Math.random() * 500) + 1;

      const trade = {
        tradeId: `TRD${String(++tradeCounter).padStart(8, '0')}`,
        symbol,
        side: Math.random() > 0.5 ? "BUY" : "SELL",
        price: Math.round(price * 100) / 100,
        quantity,
        value: Math.round(price * quantity * 100) / 100,
        timestamp: new Date(),
        exchange: exchanges[Math.floor(Math.random() * exchanges.length)]
      };

      this.tables.trades.update([trade]);
    }, 50);  // 20 trades per second
  }
}

// Initialize dashboard
document.addEventListener("DOMContentLoaded", async () => {
  const dashboard = new TradingDashboard();
  await dashboard.init();
});