// Secure pre-aggregation configuration
preAggregations: {
  secureRollup: {
    measures: [totalRevenue, count],
    dimensions: [status],
    timeDimension: createdAt,
    granularity: `day`,

    // Refresh only during off-peak hours
    refreshKey: {
      every: `1 day`,
      timezone: `UTC`,
      sql: `SELECT MAX(updated_at) FROM orders`
    },

    // Store in separate schema
    external: true,
    externalRefresh: true,

    // Index for faster queries
    indexes: {
      categoryIndex: {
        columns: [status]
      }
    }
  }
}