// cube.js - JWT Authentication
const jwt = require('jsonwebtoken');

module.exports = {
  checkAuth: (req, auth) => {
    // Verify JWT token
    const token = auth && auth.split(' ')[1];

    if (!token) {
      throw new Error('No token provided');
    }

    try {
      const decoded = jwt.verify(token, process.env.CUBEJS_API_SECRET);
      req.securityContext = decoded;
    } catch (err) {
      throw new Error('Invalid token');
    }
  },

  // Query complexity limits
  queryRewrite: (query, { securityContext }) => {
    // Limit time range
    const maxDays = securityContext.isAdmin ? 365 : 90;

    if (query.timeDimensions) {
      query.timeDimensions = query.timeDimensions.map(td => ({
        ...td,
        dateRange: limitDateRange(td.dateRange, maxDays)
      }));
    }

    // Limit result size
    if (!query.limit || query.limit > 10000) {
      query.limit = 10000;
    }

    return query;
  }
};