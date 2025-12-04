// schema/Orders.js
cube(`Orders`, {
  sql: `SELECT * FROM orders`,

  // Define joins to related cubes
  joins: {
    Customers: {
      relationship: `belongsTo`,
      sql: `${CUBE}.customer_id = ${Customers}.id`
    },
    OrderItems: {
      relationship: `hasMany`,
      sql: `${CUBE}.id = ${OrderItems}.order_id`
    }
  },

  // Measures (aggregations)
  measures: {
    count: {
      type: `count`,
      drillMembers: [id, createdAt, status]
    },

    totalRevenue: {
      sql: `${OrderItems.lineTotal}`,
      type: `sum`,
      format: `currency`
    },

    averageOrderValue: {
      sql: `${totalRevenue} / NULLIF(${count}, 0)`,
      type: `number`,
      format: `currency`
    },

    completedCount: {
      type: `count`,
      filters: [{ sql: `${CUBE}.status = 'completed'` }]
    },

    completionRate: {
      sql: `${completedCount}::float / NULLIF(${count}, 0) * 100`,
      type: `number`,
      format: `percent`
    },

    averageFulfillmentTime: {
      sql: `AVG(EXTRACT(EPOCH FROM (${CUBE}.completed_at - ${CUBE}.created_at)) / 3600)`,
      type: `number`,
      title: `Avg Fulfillment Time (hours)`
    }
  },

  // Dimensions (groupings)
  dimensions: {
    id: {
      sql: `${CUBE}.id`,
      type: `number`,
      primaryKey: true
    },

    status: {
      sql: `${CUBE}.status`,
      type: `string`
    },

    createdAt: {
      sql: `${CUBE}.created_at`,
      type: `time`
    },

    completedAt: {
      sql: `${CUBE}.completed_at`,
      type: `time`
    },

    // Time-based dimensions
    createdAtMonth: {
      sql: `DATE_TRUNC('month', ${CUBE}.created_at)`,
      type: `time`
    },

    createdAtWeek: {
      sql: `DATE_TRUNC('week', ${CUBE}.created_at)`,
      type: `time`
    },

    dayOfWeek: {
      sql: `EXTRACT(DOW FROM ${CUBE}.created_at)`,
      type: `number`
    },

    hourOfDay: {
      sql: `EXTRACT(HOUR FROM ${CUBE}.created_at)`,
      type: `number`
    }
  },

  // Segments (pre-defined filters)
  segments: {
    completed: {
      sql: `${CUBE}.status = 'completed'`
    },
    thisMonth: {
      sql: `${CUBE}.created_at >= DATE_TRUNC('month', NOW())`
    },
    highValue: {
      sql: `${CUBE}.id IN (
        SELECT order_id FROM order_items
        GROUP BY order_id
        HAVING SUM(price * quantity) > 500
      )`
    }
  },

  // Pre-aggregations for performance
  preAggregations: {
    // Daily rollup
    dailyRevenue: {
      measures: [totalRevenue, count, averageOrderValue],
      dimensions: [status],
      timeDimension: createdAt,
      granularity: `day`,
      partitionGranularity: `month`,
      refreshKey: {
        every: `1 hour`
      }
    },

    // Monthly rollup by customer segment
    monthlyBySegment: {
      measures: [totalRevenue, count],
      dimensions: [Customers.segment, Customers.country],
      timeDimension: createdAt,
      granularity: `month`,
      refreshKey: {
        every: `6 hours`
      }
    }
  }
});