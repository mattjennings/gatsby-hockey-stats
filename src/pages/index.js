import React from "react"
import { StaticQuery, graphql, useStaticQuery } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import SearchPlayers from "../components/SearchPlayers"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query IndexData {
      siteSearchIndex {
        index
      }

      leagueLeaders: allPlayerStats(
        filter: {
          stat: { points: { ne: null } }
          league: { name: { eq: "National Hockey League" } }
          season: { eq: "20192020" }
        }
        limit: 10
        sort: { fields: stat___points, order: DESC }
      ) {
        nodes {
          stat {
            points
          }
          season
          childrenPlayer {
            fullName
            currentTeam {
              name
            }
            headshot {
              md
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Home" />

      <SearchPlayers searchIndex={data.siteSearchIndex.index} />
      <h1>League Leaders</h1>
      <ul>
        {data.leagueLeaders.nodes.map((node, index) => (
          <li key={index}>
            {node.childrenPlayer[0].fullName} - {node.stat.points}
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default IndexPage
