module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/proxy',
          destination: process.env.SALESFORCE_URL,
        },
      ];
    },
  };