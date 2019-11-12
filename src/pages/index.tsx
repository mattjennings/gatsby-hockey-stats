import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import styled from "styled-components"
import PlayerRankCard from "../components/PlayerRankCard"
import SEO from "../components/SEO"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      leagueLeaders: allPlayerStats(
        filter: {
          stat: { points: { ne: null } }
          league: { id: { eq: 133 } } # 133 = NHL league id
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

  const [leagueLeader, ...players] = data.leagueLeaders.nodes

  return (
    <Root>
      <SEO title="Home" />

      <h1 style={{ marginBottom: 10, textAlign: "center" }}>League Leaders</h1>
      <LeagueLeader>
        <PlayerRankCard player={leagueLeader} rank={1} />
      </LeagueLeader>
      <Players>
        {players.map((node, index) => (
          <PlayerRankCard key={index} player={node} rank={index + 2} />
        ))}
      </Players>
    </Root>
  )
}

const Root = styled.div`
  margin-bottom: ${props => props.theme.spacing(4)};
`

const Players = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: ${props => props.theme.spacing(2)};
  justify-items: center;

  .player {
    width: 200px;
  }
`

const LeagueLeader = styled.div`
  margin-bottom: ${props => props.theme.spacing(4)};

  .player {
    width: 400px;
    margin: auto;

    .rank {
      font-size: 36px;
      left: ${props => props.theme.spacing(2)};
    }

    @media (max-width: 600px) {
      width: 90vw;
    }
  }
`

export default IndexPage
