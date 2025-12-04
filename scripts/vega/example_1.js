// Interactive scatter plot with Vega-Lite
const spec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "data": { "url": "/api/sales" },
  "mark": "point",
  "encoding": {
    "x": {
      "field": "revenue",
      "type": "quantitative",
      "scale": { "zero": false }
    },
    "y": {
      "field": "profit",
      "type": "quantitative"
    },
    "color": {
      "field": "category",
      "type": "nominal"
    },
    "size": {
      "field": "volume",
      "type": "quantitative"
    },
    "tooltip": [
      { "field": "product", "type": "nominal" },
      { "field": "revenue", "type": "quantitative", "format": "$,.0f" }
    ]
  },
  "selection": {
    "brush": { "type": "interval" }
  },
  "width": 600,
  "height": 400
};

// Embed in page
vegaEmbed('#chart', spec, { theme: 'dark' });