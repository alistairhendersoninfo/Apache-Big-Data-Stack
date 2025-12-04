// Connect to Python server
import perspective from "@finos/perspective";

async function connectToServer() {
  // Create WebSocket connection
  const websocket = perspective.websocket("ws://localhost:8080/websocket");

  // Open remote table
  const table = await websocket.open_table("trades");

  // Load into viewer
  const viewer = document.getElementById("trades-viewer");
  await viewer.load(table);

  await viewer.restore({
    plugin: "Datagrid",
    group_by: ["symbol"],
    columns: ["trade_id", "price", "quantity", "value"],
    aggregates: {
      trade_id: "count",
      price: "avg",
      quantity: "sum",
      value: "sum"
    }
  });
}

connectToServer();