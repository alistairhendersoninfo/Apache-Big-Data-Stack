// Validate Vega-Lite spec before rendering
import { compile } from 'vega-lite';

function safeRender(spec) {
  try {
    // Validate and compile
    const vegaSpec = compile(spec).spec;

    // Disable external data URLs in production
    if (vegaSpec.data?.url && !isAllowedUrl(vegaSpec.data.url)) {
      throw new Error('External data URLs not allowed');
    }

    return vegaEmbed('#chart', spec, {
      loader: { http: { credentials: 'same-origin' } }
    });
  } catch (err) {
    console.error('Invalid spec:', err);
  }
}