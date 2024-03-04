module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/proxy',
          destination: process.env.NEXT_PUBLIC_SALESFORCE_URL,
        },
      ];
    },
  };