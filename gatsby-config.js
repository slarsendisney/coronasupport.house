const path = require(`path`);
require("dotenv").config({
  path: `.env`
});
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
    },
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: process.env.FIREBASE_API_KEY,
          authDomain: process.env.FIREBASE_AUTH_DOMAIN,
          databaseURL: process.env.FIREBASE_DB_URL,
          projectId: process.env.FIREBASE_PROJECT_ID,
          storageBucket: process.env.FIREBASE_SB,
          messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID,
          appId: process.env.FIREBASE_APP_ID
        }
      }
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/volunteers/*`, `/settings/*`] }
    }
  ]
};
