import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import SearchPlayers from "../components/SearchPlayers"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <StaticQuery
      query={graphql`
        query SearchIndexQuery {
          siteSearchIndex {
            index
          }
        }
      `}
      render={data => {
        return <SearchPlayers searchIndex={data.siteSearchIndex.index} />
      }}
    />
  </Layout>
)

export default IndexPage
