module.exports = {
  siteMetadata: {
    title: `Hockey Stats`,
    description: ``,
    author: `@mattjennings44`,
  },
  plugins: [
    // local plugins
    "load-nhl-players",

    // gatsby plugins
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
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: ["name"],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields` values
          Player: {
            id: node => node.id,
            name: node => node.fullName,
            team: node => node.currentTeam && node.currentTeam.name,
          },
        },
      },
    },
  ],
}
