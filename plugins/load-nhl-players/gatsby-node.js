/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { fetchAllPlayers } = require("./util")

exports.sourceNodes = async ({
  cache,
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions

  const players = await fetchAllPlayers(cache)

  players.forEach(({ stats, ...player }) => {
    const playerNodeId = `${player.id}`

    // stats is an array of objects containing splits and type. we'll combine all the splits into one array,
    // and assign each split their "type"
    const playerStatsNodeIds = stats.reduce(
      (allStats, { type, splits }) => [
        ...allStats,

        // create stat node for each split
        ...splits.reduce((total, split) => {
          const statNodeId = createNodeId(
            `${player.id}-stats-${type.displayname}-${split.season}-${split.sequenceNumber}`
          )

          const data = {
            ...split,
            // assign the split the name of its stat type
            type: type.displayname,
          }

          const statsNodeMeta = {
            id: statNodeId,
            parent: null,
            children: [playerNodeId],
            internal: {
              type: "PlayerStats",
              mediaType: "application/json",
              content: JSON.stringify(data),
              contentDigest: createContentDigest(data),
            },
          }
          createNode({
            ...split,
            ...statsNodeMeta,
          })
          return [...total, statNodeId]
        }, []),
      ],
      []
    )

    const playerNodeMeta = {
      id: playerNodeId,
      parent: null,
      children: [...playerStatsNodeIds],
      internal: {
        type: `Player`,
        mediaType: `application/json`,
        content: JSON.stringify(player),
        contentDigest: createContentDigest(player),
      },
    }

    createNode({
      ...player,
      ...playerNodeMeta,
    })
  })
}
