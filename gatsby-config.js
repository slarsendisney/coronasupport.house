const path = require(`path`);

module.exports = {
  siteMetadata: {
    title: `Sussex Square & Lewes Crescent Mutual Aid Network`,
    description: `Coronavirus support network for the Sussex Square & Lewes Crescent area.`,
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
        trackingId: "UA-26978781-5",
        head: false
      }
    }
  ]
};
