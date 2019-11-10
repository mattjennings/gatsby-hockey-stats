/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const { data } = await graphql(`
    query {
      allPlayer {
        nodes {
          id
          fullName
          currentAge
          currentTeam {
            name
          }
          primaryPosition {
            code
            name
          }
          headshot {
            sm
            md
            lg
          }
          childrenPlayerStats {
            season
            stat {
              wins
              timeOnIce
              ties
              shutouts
              shotsAgainst
              shots
              shotPct
              shortHandedTimeOnIce
              shortHandedShots
              shortHandedSaves
              shortHandedSavePercentage
              shortHandedPoints
              shortHandedGoals
              shifts
              saves
              savePercentage
              powerPlayTimeOnIce
              powerPlayShots
              powerPlaySaves
              powerPlaySavePercentage
              powerPlayPoints
              powerPlayGoals
              points
              plusMinus
              pim
              penaltyMinutes
              overTimeGoals
              ot
              losses
              hits
              goalsAgainst
              goals
              goalAgainstAverage
              gamesStarted
              games
              gameWinningGoals
              faceOffPct
              evenTimeOnIce
              evenStrengthSavePercentage
              evenShots
              evenSaves
              blocked
              assists
            }
            sequenceNumber
            league {
              name
            }
            team {
              name
            }
          }
        }
      }
    }
  `)

  data.allPlayer.nodes.forEach(node =>
    createPage({
      path: `/player/${node.id}`,
      component: require.resolve("./src/components/Player.tsx"),
      context: {
        player: node,
      },
    })
  )
}
