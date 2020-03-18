const path = require(`path`);

module.exports = {
  siteMetadata: {
    title: `Sussex Square & Lewes Crescent Mutual Aid Network`,
    description: `Can you help me find my next job opportunity?`,
    author: `@sld`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: `src/images/Logo.png`
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-26978781-3",
        head: false
      }
    }
  ]
};
