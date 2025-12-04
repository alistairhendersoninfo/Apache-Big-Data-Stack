// Sanitize user-provided data before rendering
function sanitizeData(data) {
  return data.map(item => ({
    // Sanitize strings to prevent XSS
    label: DOMPurify.sanitize(String(item.label)),
    // Ensure numeric values
    value: Number(item.value) || 0,
    // Validate dates
    timestamp: new Date(item.timestamp).getTime() ?
               new Date(item.timestamp) : new Date()
  }));
}

// Use text() instead of html() for user data
selection.text(d => d.label);  // Safe
selection.html(d => d.label);  // Dangerous with untrusted data