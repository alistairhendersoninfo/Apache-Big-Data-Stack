// Validate and sanitize chart data
function sanitizeChartData(data: any[]): any[] {
  return data
    .filter(item => {
      // Ensure valid data structure
      if (!item || typeof item !== 'object') return false;
      if (item.value !== undefined && typeof item.value !== 'number') return false;
      if (!isFinite(item.value)) return false;
      return true;
    })
    .map(item => ({
      ...item,
      // Sanitize string fields
      name: item.name ? String(item.name).slice(0, 100) : '',
      // Clamp numeric values
      value: Math.max(-1e15, Math.min(1e15, item.value))
    }));
}