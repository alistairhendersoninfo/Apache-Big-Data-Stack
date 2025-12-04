// schema/Products.js
cube(`Products`, {
  sql: `SELECT * FROM products`,

  joins: {
    OrderItems: {
      relationship: `hasMany`,
      sql: `${CUBE}.id = ${OrderItems}.product_id`
    }
  },

  measures: {
    count: {
      type: `count`
    },

    totalSold: {
      sql: `${OrderItems.quantity}`,
      type: `sum`
    },

    totalRevenue: {
      sql: `${OrderItems.lineTotal}`,
      type: `sum`,
      format: `currency`
    },

    averagePrice: {
      sql: `${CUBE}.price`,
      type: `avg`,
      format: `currency`
    },

    profitMargin: {
      sql: `(${CUBE}.price - ${CUBE}.cost) / NULLIF(${CUBE}.price, 0) * 100`,
      type: `avg`,
      format: `percent`
    }
  },

  dimensions: {
    id: {
      sql: `${CUBE}.id`,
      type: `number`,
      primaryKey: true
    },

    name: {
      sql: `${CUBE}.name`,
      type: `string`
    },

    category: {
      sql: `${CUBE}.category`,
      type: `string`
    },

    subcategory: {
      sql: `${CUBE}.subcategory`,
      type: `string`
    },

    price: {
      sql: `${CUBE}.price`,
      type: `number`,
      format: `currency`
    },

    priceRange: {
      type: `string`,
      case: {
        when: [
          { sql: `${CUBE}.price < 25`, label: `Budget` },
          { sql: `${CUBE}.price < 100`, label: `Mid-Range` },
          { sql: `${CUBE}.price < 500`, label: `Premium` }
        ],
        else: { label: `Luxury` }
      }
    }
  }
});

// Order Items cube
cube(`OrderItems`, {
  sql: `SELECT * FROM order_items`,

  joins: {
    Orders: {
      relationship: `belongsTo`,
      sql: `${CUBE}.order_id = ${Orders}.id`
    },
    Products: {
      relationship: `belongsTo`,
      sql: `${CUBE}.product_id = ${Products}.id`
    }
  },

  measures: {
    count: {
      type: `count`
    },

    quantity: {
      sql: `${CUBE}.quantity`,
      type: `sum`
    },

    lineTotal: {
      sql: `${CUBE}.price * ${CUBE}.quantity - ${CUBE}.discount`,
      type: `sum`,
      format: `currency`
    },

    averageDiscount: {
      sql: `${CUBE}.discount`,
      type: `avg`,
      format: `currency`
    }
  },

  dimensions: {
    id: {
      sql: `${CUBE}.id`,
      type: `number`,
      primaryKey: true
    },

    price: {
      sql: `${CUBE}.price`,
      type: `number`
    }
  }
});