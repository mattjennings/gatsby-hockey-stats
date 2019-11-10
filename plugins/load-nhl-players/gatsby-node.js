/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { fetchAllPlayers } = require("./util")

exports.createPages = async (
  { actions: { createPage }, cache },
  { createPlayerPage }
) => {
  const players = await fetchAllPlayers(cache)

  if (createPlayerPage) {
    players.forEach(player => createPage(createPlayerPage(player)))
  } else {
    console.warn(
      "createPlayerPage option not found, please provide it in options for load-nhl-players"
    )
  }
}

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

            // attach the player to the stat
            player___NODE: playerNodeId,
          }

          const statsNodeMeta = {
            id: statNodeId,
            parent: null,
            children: [],
            internal: {
              type: "PlayerStats",
              mediaType: "application/json",
              content: JSON.stringify(data),
              contentDigest: createContentDigest(data),
            },
          }
          createNode({ ...split, ...statsNodeMeta })
          return [...total, statNodeId]
        }, []),
      ],
      []
    )

    const playerNodeMeta = {
      id: playerNodeId,
      parent: null,
      children: [],
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
      stats___NODE: playerStatsNodeIds,
    })
  })
}
