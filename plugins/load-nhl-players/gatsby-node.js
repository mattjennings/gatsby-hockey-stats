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
    const cachedPlayer = await cache.get(cacheKey)
    const isCacheExpired = cachedPlayer && cachedPlayer.expiry < Date.now()

    const fullPlayer =
      cachedPlayer && !isCacheExpired
        ? cachedPlayer
        : await fetch(
            `https://statsapi.web.nhl.com/api/v1/people/${player.id}/stats?stats=yearByYear`
          ).then(res => res.json())

    if (!cachedPlayer || isCacheExpired) {
      // cache for 1 day
      await cache.set(cacheKey, {
        ...fullPlayer,
        expiry: Date.now() + 3600000,
      })
    }

    if (fullPlayer.stats) {
      createPage({
        path: `/player/${player.id}`,
        component: playerPageComponent,
        context: {
          playerId: player.id,
          playerName: player.name,
          headshot: {
            sm: `https://nhl.bamcontent.com/images/headshots/current/168x168/${player.id}.jpg`,
            md: `https://nhl.bamcontent.com/images/headshots/current/168x168/${player.id}.jpg`,
            lg: `https://nhl.bamcontent.com/images/headshots/current/168x168/${player.id}.jpg`,
          },
          stats: {
            yearByYear: fullPlayer.stats[0].splits,
          },
        },
      })
    } else {
      console.warn(`
      Unable to create page for player ${player.id}
      
      fullPlayer:
      ${fullPlayer}
      `)
    }
  })
}
