const batchPromises = require("batch-promises")
const fetch = require("isomorphic-fetch")

async function fetchAllPlayers(cache) {
  const teams = await fetchTeams(cache)

  const playerIds = teams.reduce((players, team) => {
    return [...players, ...team.roster.roster.map(row => row.person.id)]
  }, [])

  return batchPromises(30, playerIds, async playerId => {
    const fullPlayer = await fetchPlayer(playerId, cache)

    return {
      ...fullPlayer,
      headshot: {
        sm: `https://nhl.bamcontent.com/images/headshots/current/168x168/${playerId}.jpg`,
        md: `https://nhl.bamcontent.com/images/headshots/current/168x168/${playerId}.jpg`,
        lg: `https://nhl.bamcontent.com/images/headshots/current/168x168/${playerId}.jpg`,
      },
    }
  })
}

async function fetchPlayer(id, cache) {
  const url = `https://statsapi.web.nhl.com/api/v1/people/${id}?expand=person.stats&stats=yearByYear`

  const results =
    (await getFromCache(url, cache)) ||
    (await fetch(
      `https://statsapi.web.nhl.com/api/v1/people/${id}?expand=person.stats&stats=yearByYear`
    )
      .then(res => res.json())
      .catch(() => null))

  await setCacheItem(url, results, cache)
  const player = results && results.people && results.people[0]

  if (player) {
    return player
  } else {
    console.warn(`Unable to fetch player ${id}`)
    return null
  }
}

async function fetchTeams(cache) {
  const url = `https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster`

  const results =
    (await getFromCache(url, cache)) ||
    (await fetch(
      `https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster`
    ).then(res => res.json()))

  await setCacheItem(url, results, cache)

  return results.teams
}

async function getFromCache(key, cache) {
  const data = await cache.get(key)
  const isCacheExpired = data && data.__expiry__ < Date.now()

  return isCacheExpired ? null : data
}

async function setCacheItem(key, value, cache) {
  // 4 hour cache
  return cache.set(key, {
    ...value,
    __expiry__: Date.now() + 1000 * 60 * 60 * 4,
  })
}

module.exports = {
  fetchAllPlayers,
  fetchPlayer,
  fetchTeams,
}
