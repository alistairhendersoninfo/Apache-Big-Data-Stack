// cube.js
module.exports = {
  // Security context from JWT
  contextToAppId: ({ securityContext }) => {
    return `CUBE_APP_${securityContext.tenantId}`;
  },

  // Tenant-specific database
  driverFactory: ({ securityContext }) => {
    return {
      type: 'postgres',
      host: process.env.CUBEJS_DB_HOST,
      database: `tenant_${securityContext.tenantId}`,
      user: process.env.CUBEJS_DB_USER,
      password: process.env.CUBEJS_DB_PASS
    };
  },

  // Row-level security
  queryRewrite: (query, { securityContext }) => {
    if (!securityContext.isAdmin) {
      // Add tenant filter to all queries
      query.filters.push({
        member: 'Orders.tenantId',
        operator: 'equals',
        values: [securityContext.tenantId]
      });
    }
    return query;
  },

  // Schedule pre-aggregation refresh per tenant
  scheduledRefreshContexts: async () => {
    const tenants = await getTenantList();
    return tenants.map(tenant => ({
      securityContext: { tenantId: tenant.id }
    }));
  }
};