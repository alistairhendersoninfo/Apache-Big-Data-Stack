import perspective from "@finos/perspective";
import { tableFromIPC } from "apache-arrow";

async function loadArrowData(url) {
  // Fetch Arrow IPC file
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();

  // Create Perspective table from Arrow
  const worker = perspective.worker();
  const table = await worker.table(buffer);

  return table;
}

// Load from Parquet via Arrow
async function loadParquetData(url) {
  // Requires server-side conversion
  const response = await fetch(`/api/parquet-to-arrow?file=${url}`);
  const buffer = await response.arrayBuffer();

  const worker = perspective.worker();
  return await worker.table(buffer);
}