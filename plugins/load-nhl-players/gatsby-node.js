/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const batchPromises = require("batch-promises")
const { fetchAllPlayers, fetchPlayer, fetchTeams } = require("./util")

exports.createPages = async (
  { actions: { createPage }, cache },
  { playerPageComponent }
) => {
  const players = await fetchAllPlayers(cache)

  players.forEach(player => {
    createPage({
      path: `/player/${player.id}`,
      component: playerPageComponent,
      context: {
        player,
      },
    })
  })
}

exports.sourceNodes = async ({
  cache,
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions

  const players = await fetchAllPlayers(cache)

  players.forEach(player => {
    const nodeContent = JSON.stringify(player)
    const data = {
      ...player,
      playerId: player.id,
    }
    const nodeMeta = {
      id: createNodeId(`player.${player.id}`),
      parent: null,
      children: [],
      internal: {
        type: `Player`,
        mediaType: `application/json`,
        content: nodeContent,
        contentDigest: createContentDigest(data),
      },
    }

    const node = Object.assign({}, data, nodeMeta)
    createNode({ ...node, ...nodeMeta })
  })
}
