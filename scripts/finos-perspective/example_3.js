// Add computed columns using Perspective expressions
await viewer.restore({
  columns: ["symbol", "last", "vwap", "spread", "spreadBps"],
  expressions: {
    // Volume-Weighted Average Price
    'vwap': '"value" / "quantity"',

    // Bid-Ask Spread
    'spread': '"ask" - "bid"',

    // Spread in basis points
    'spreadBps': '(("ask" - "bid") / "last") * 10000',

    // Price change indicator
    'trend': 'if("change" > 0, "UP", if("change" < 0, "DOWN", "FLAT"))',

    // Time bucket for aggregation
    'minute': 'bucket("timestamp", "m")'
  }
});