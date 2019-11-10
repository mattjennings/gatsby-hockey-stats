import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import SearchPlayers from "../components/SearchPlayers"
import Card from "../components/Card"
import styled from "styled-components"
import { motion } from "framer-motion"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
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
            id
            fullName
            currentTeam {
              name
            }
            headshot {
              md
              lg
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Home" />

      <h1>League Leaders</h1>
      <Players>
        {data.leagueLeaders.nodes.map((node, index) => (
          <PlayerLink key={index} to={`/player/${node.childrenPlayer[0].id}`}>
            <PlayerCard>
              <img
                src={node.childrenPlayer[0].headshot.lg}
                alt={node.fullname}
              />
              <h2 className="name">{node.childrenPlayer[0].fullName}</h2>
              <h3 className="points">
                <span className="points-number">{node.stat.points}</span> pts
              </h3>
            </PlayerCard>
          </PlayerLink>
        ))}
      </Players>
    </Layout>
  )
}

const PlayerLink = styled(props => (
  <motion.div whileHover={{ scale: 1.05 }}>
    <Link {...props} />
  </motion.div>
))`
  text-decoration: none;
  color: inherit;
`

const Players = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const PlayerCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: ${props => props.theme.spacing()};

  img {
    border-radius: 5px;
  }

  .points,
  .name {
    font-size: 1em;
    font-weight: normal;
  }

  .points-number {
    font-size: 2em;
  }
`

export default IndexPage
