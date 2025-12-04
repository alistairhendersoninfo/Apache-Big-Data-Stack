// Efficient streaming with Arrow
class ArrowDataStream {
  constructor(table) {
    this.table = table;
    this.buffer = [];
    this.batchSize = 1000;
    this.flushInterval = 100;
  }

  start() {
    // Batch updates for efficiency
    setInterval(() => {
      if (this.buffer.length > 0) {
        this.table.update(this.buffer);
        this.buffer = [];
      }
    }, this.flushInterval);
  }

  push(record) {
    this.buffer.push(record);

    // Flush if batch size reached
    if (this.buffer.length >= this.batchSize) {
      this.table.update(this.buffer);
      this.buffer = [];
    }
  }
}