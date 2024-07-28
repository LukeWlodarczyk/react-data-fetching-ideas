const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@/ui': path.resolve(__dirname, './src/ui'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/api': path.resolve(__dirname, './src/api'),
    },
  },
};
