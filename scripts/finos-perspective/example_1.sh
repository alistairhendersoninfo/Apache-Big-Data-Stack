# Create project
mkdir perspective-dashboard && cd perspective-dashboard
npm init -y

# Install Perspective packages
npm install @finos/perspective
npm install @finos/perspective-viewer
npm install @finos/perspective-viewer-datagrid
npm install @finos/perspective-viewer-d3fc

# For Webpack bundling
npm install @finos/perspective-webpack-plugin --save-dev