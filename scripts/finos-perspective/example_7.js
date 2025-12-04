// Validate data before loading
function validateTradeData(data) {
  const requiredFields = ['symbol', 'price', 'quantity', 'timestamp'];
  const numericFields = ['price', 'quantity', 'value'];

  return data.filter(record => {
    // Check required fields
    for (const field of requiredFields) {
      if (record[field] === undefined || record[field] === null) {
        console.warn(`Missing field: ${field}`);
        return false;
      }
    }

    // Validate numeric fields
    for (const field of numericFields) {
      if (record[field] !== undefined && !isFinite(record[field])) {
        console.warn(`Invalid numeric value: ${field}`);
        return false;
      }
    }

    // Validate timestamp
    if (!(record.timestamp instanceof Date) &&
        isNaN(Date.parse(record.timestamp))) {
      console.warn('Invalid timestamp');
      return false;
    }

    return true;
  });
}