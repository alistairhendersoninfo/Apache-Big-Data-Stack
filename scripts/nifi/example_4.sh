# File attributes
${filename}
${file.size}

# String manipulation
${filename:toUpper()}
${timestamp:format('yyyy-MM-dd')}

# Conditional
${fileSize:gt(1000):ifElse('large','small')}