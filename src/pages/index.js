import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

import SEO from "../components/SEO"
import Card from "../components/Card"
import styled from "styled-components"
import { motion } from "framer-motion"
import Img from "gatsby-image"

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
            headshotImage {
              childImageSharp {
                fixed(width: 168, quality: 90) {
                  ...GatsbyImageSharpFixed_noBase64
                }
              }
            }
          }
        }
      }
    }
  `)

  return (
    <>
      <SEO title="Home" />

      <h1 style={{ marginBottom: 10, textAlign: "center" }}>League Leaders</h1>
      <Players>
        {data.leagueLeaders.nodes.map((node, index) => (
          <motion.div key={index} whileHover={{ scale: 1.05 }}>
            <PlayerLink to={`/player/${node.childrenPlayer[0].id}`}>
              <PlayerCard>
                <Img
                  fixed={
                    node.childrenPlayer[0].headshotImage.childImageSharp.fixed
                  }
                  alt={node.fullname}
                />
                <h2 className="name">{node.childrenPlayer[0].fullName}</h2>
                <h3 className="points">
                  <span className="points-number">{node.stat.points}</span> pts
                </h3>
              </PlayerCard>
            </PlayerLink>
          </motion.div>
        ))}
      </Players>
    </>
  )
}

const PlayerLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`

const Players = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const PlayerCard = styled(Card)`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: ${props => props.theme.spacing()};

  img {
    width: 168px;
    height: 168px;
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
