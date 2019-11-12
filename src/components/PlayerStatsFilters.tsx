import React, { useMemo } from "react"

export default function PlayerStatsFilters({ stats }: { stats: any }) {
  const leagues = useMemo(() => stats.map(stat => stat.league), [stats])

  return leagues.map(league => <label key={league.id}>{league.name}</label>)
}

function filterStatsByLeagues(stats: any, leagues?: number[]) {
  if (!leagues) {
    return stats
  }

  return stats.filter(stat => leagues.includes(stat.league.id))
}

function statsContainNhl(stats: any) {
  const nhlId = 133

  return !!stats.find(stat => stat.league.id === nhlId)
}
