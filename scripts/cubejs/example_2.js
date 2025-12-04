// schema/Customers.js
cube(`Customers`, {
  sql: `SELECT * FROM customers`,

  joins: {
    Orders: {
      relationship: `hasMany`,
      sql: `${CUBE}.id = ${Orders}.customer_id`
    }
  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [id, email, name]
    },

    totalCustomers: {
      type: `countDistinct`,
      sql: `${CUBE}.id`
    },

    newCustomers: {
      type: `count`,
      filters: [
        {
          sql: `${CUBE}.created_at >= DATE_TRUNC('month', NOW())`
        }
      ]
    },

    lifetimeValue: {
      sql: `${Orders.totalRevenue}`,
      type: `sum`,
      format: `currency`
    },

    averageLifetimeValue: {
      sql: `${lifetimeValue} / NULLIF(${count}, 0)`,
      type: `number`,
      format: `currency`
    },

    repeatCustomerRate: {
      sql: `
        COUNT(DISTINCT CASE WHEN customer_order_count > 1 THEN customer_id END)::float /
        NULLIF(COUNT(DISTINCT customer_id), 0) * 100
      `,
      type: `number`,
      format: `percent`
    }
  },

  dimensions: {
    id: {
      sql: `${CUBE}.id`,
      type: `number`,
      primaryKey: true
    },

    email: {
      sql: `${CUBE}.email`,
      type: `string`
    },

    name: {
      sql: `${CUBE}.name`,
      type: `string`
    },

    segment: {
      sql: `${CUBE}.segment`,
      type: `string`
    },

    country: {
      sql: `${CUBE}.country`,
      type: `string`
    },

    createdAt: {
      sql: `${CUBE}.created_at`,
      type: `time`
    },

    // Cohort dimension
    signupCohort: {
      sql: `DATE_TRUNC('month', ${CUBE}.created_at)`,
      type: `time`
    },

    // Customer tier based on spending
    tier: {
      type: `string`,
      case: {
        when: [
          {
            sql: `${lifetimeValue} >= 10000`,
            label: `Platinum`
          },
          {
            sql: `${lifetimeValue} >= 5000`,
            label: `Gold`
          },
          {
            sql: `${lifetimeValue} >= 1000`,
            label: `Silver`
          }
        ],
        else: { label: `Bronze` }
      }
    }
  },

  preAggregations: {
    customerMetrics: {
      measures: [count, lifetimeValue, averageLifetimeValue],
      dimensions: [segment, country, tier],
      refreshKey: {
        every: `1 day`
      }
    }
  }
});