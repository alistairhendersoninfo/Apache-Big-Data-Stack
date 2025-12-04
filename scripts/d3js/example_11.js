// Use Canvas for large datasets (>10,000 points)
function renderWithCanvas(data) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;

  // Handle high-DPI displays
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  // Batch render points
  ctx.beginPath();
  data.forEach((d, i) => {
    const x = xScale(d.x);
    const y = yScale(d.y);
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.stroke();
}

// Data decimation for large time series
function decimateData(data, maxPoints) {
  if (data.length <= maxPoints) return data;

  const step = Math.ceil(data.length / maxPoints);
  return data.filter((_, i) => i % step === 0);
}