/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const batchPromises = require("batch-promises")
const fetch = require("isomorphic-fetch")

exports.createPages = async (
  { actions: { createPage }, cache },
  { playerIds, playerPageComponent }
) => {
  await batchPromises(10, playerIds, async playerId => {
    const cacheKey = `${playerId}-stats`
    const cachedPlayer = await cache.get(cacheKey)
    const isCacheExpired = cachedPlayer && cachedPlayer.expiry < Date.now()

    const fullPlayer =
      cachedPlayer && !isCacheExpired
        ? cachedPlayer
        : await fetchPlayer(playerId)

    if (!cachedPlayer || isCacheExpired) {
      // cache for 1 day
      await cache.set(cacheKey, {
        ...fullPlayer,
        expiry: Date.now() + 3600000,
      })
    }

    if (fullPlayer.stats) {
      createPage({
        path: `/player/${playerId}`,
        component: playerPageComponent,
        context: {
          player: {
            ...fullPlayer,
            headshot: {
              sm: `https://nhl.bamcontent.com/images/headshots/current/168x168/${playerId}.jpg`,
              md: `https://nhl.bamcontent.com/images/headshots/current/168x168/${playerId}.jpg`,
              lg: `https://nhl.bamcontent.com/images/headshots/current/168x168/${playerId}.jpg`,
            },
          },
        },
      })
    } else {
      console.warn(`
      Unable to create page for player ${playerId}
      
      fullPlayer:
      ${fullPlayer}
      `)
    }
  })
}

async function fetchPlayer(id) {
  const [
    {
      people: [player],
    },
    {
      stats: [yearByYear],
    },
  ] = await Promise.all([
    fetch(`https://statsapi.web.nhl.com/api/v1/people/${id}`).then(res =>
      res.json()
    ),
    fetch(
      `https://statsapi.web.nhl.com/api/v1/people/${id}/stats?stats=yearByYear`
    ).then(res => res.json()),
  ])

  return {
    ...player,
    stats: {
      yearByYear: yearByYear.splits,
    },
  }
}
