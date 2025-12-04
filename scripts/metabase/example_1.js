// Embed Metabase dashboard in React application
import React from 'react';
import jwt from 'jsonwebtoken';

const METABASE_SITE_URL = 'https://metabase.example.com';
const METABASE_SECRET_KEY = process.env.METABASE_SECRET_KEY;

function EmbeddedDashboard({ dashboardId, params }) {
  // Generate signed embedding token
  const payload = {
    resource: { dashboard: dashboardId },
    params: params,
    exp: Math.round(Date.now() / 1000) + (10 * 60)  // 10 minutes
  };

  const token = jwt.sign(payload, METABASE_SECRET_KEY);

  const iframeUrl = `${METABASE_SITE_URL}/embed/dashboard/${token}#bordered=false&titled=true`;

  return (
    <iframe
      src={iframeUrl}
      frameBorder="0"
      width="100%"
      height="600"
      allowTransparency
    />
  );
}

export default function AnalyticsDashboard({ customerId }) {
  return (
    <EmbeddedDashboard
      dashboardId={42}
      params={{ customer_id: customerId }}
    />
  );
}