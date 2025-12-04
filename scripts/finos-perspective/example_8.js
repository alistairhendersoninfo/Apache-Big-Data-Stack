// Configure table limits to prevent memory issues
const table = await worker.table(schema, {
  limit: 100000,  // Max 100k rows in browser
  index: "id"     // Enable efficient updates
});

// Monitor memory usage
setInterval(async () => {
  const size = await table.size();
  const view = await table.view();
  const numColumns = await view.num_columns();

  console.log(`Table size: ${size} rows, ${numColumns} columns`);

  // Warn if approaching limit
  if (size > 90000) {
    console.warn('Approaching row limit, consider archiving old data');
  }
}, 60000);