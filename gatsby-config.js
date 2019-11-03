const allPlayers = require("./src/data/players.json")

const players =
  process.env.NODE_ENV === "development" ? allPlayers.slice(0, 10) : allPlayers

module.exports = {
  siteMetadata: {
    title: `NHL Stats`,
    description: ``,
    author: `@mattjennings44`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    "gatsby-plugin-typescript",
    `gatsby-plugin-offline`,
    "gatsby-plugin-styled-components",
    {
      resolve: "load-nhl-players",
      options: {
        playerIds: players.map(player => player.id),
        playerPageComponent: require.resolve("./src/components/Player.tsx"),
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data`,
      },
    },
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`name`],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields` values
          PlayersJson: {
            name: node => node.name,
          },
        },
      },
    },
  ],
}
