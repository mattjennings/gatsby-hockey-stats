/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const batchPromises = require("batch-promises")
const fetch = require("isomorphic-fetch")
const allPlayers = require("./players/all-players.json")

const players =
  process.env.NODE_ENV === "development" ? allPlayers.slice(0, 100) : allPlayers

exports.createPages = async (
  { actions: { createPage }, cache },
  { playerPageComponent }
) => {
  await batchPromises(10, players, async player => {
    const cacheKey = `${player.id}-stats`
    const cachedStats = await cache.get(cacheKey)
    const isCacheExpired = cachedStats && cachedStats.expiry < Date.now()

    const fullPlayer =
      cachedStats && !isCacheExpired
        ? cachedStats.stats
        : await fetch(
            `https://statsapi.web.nhl.com/api/v1/people/${player.id}/stats?stats=yearByYear`
          ).then(res => res.json())

    if (!cachedStats || isCacheExpired) {
      // cache for 1 day
      await cache.set(cacheKey, {
        stats: fullPlayer.stats,
        expiry: Date.now() + 3600000,
      })
    }

    createPage({
      path: `/player/${player.id}`,
      component: playerPageComponent,
      context: {
        playerId: player.id,
        playerName: player.name,
        stats: {
          yearByYear: fullPlayer.stats[0].splits,
        },
      },
    })
  })
}
