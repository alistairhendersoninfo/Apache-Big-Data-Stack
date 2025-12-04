// .env
CUBEJS_DB_TYPE=druid
CUBEJS_DB_URL=http://druid-broker:8082/druid/v2/sql

// schema/Events.js
cube(`Events`, {
  sql: `SELECT * FROM events`,

  measures: {
    count: {
      type: `count`
    },
    uniqueUsers: {
      sql: `user_id`,
      type: `countDistinctApprox`  // Uses Druid's HLL
    }
  },

  dimensions: {
    eventType: {
      sql: `event_type`,
      type: `string`
    },
    timestamp: {
      sql: `__time`,
      type: `time`
    }
  }
});