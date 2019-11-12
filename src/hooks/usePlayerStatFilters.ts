import { useMemo, useState } from "react"

export interface PlayerStatFilters {
  leagues: string[]
}

type FilteredStats = any
export default function usePlayerStatFilters({
  stats,
  filters,
}: {
  stats: any
  filters: PlayerStatFilters
}): FilteredStats {
  return useMemo(() => filterStatsByLeagues(stats, filters.leagues), [
    filters,
    stats,
  ])
}

export function getDefaultFilters(stats: any): PlayerStatFilters {
  const leagueNames = getAllLeagueNames(stats)

  return {
    leagues: leagueNames.find(name => name === "National Hockey League")
      ? ["National Hockey League", "AHL"]
      : leagueNames,
  }
}

export function getAllLeagueNames(stats: any): string[] {
  // arbitrary league tier order
  const leagueOrder = [
    "National Hockey League",
    "AHL",
    "WHL",
    "OHL",
    "QMJHL",
  ].reverse()

  // uniquely combine league names into an array
  const unique = Array.from(
    new Set(stats.map(stat => stat.league.name))
  ) as string[]

  // sort names by index in leagueOrder
  return unique.sort((a, b) =>
    leagueOrder.indexOf(a) > leagueOrder.indexOf(b) ? -1 : 1
  )
}

function filterStatsByLeagues(stats: any, leagues?: string[]) {
  if (!leagues) {
    return stats
  }

  return stats.filter(stat => leagues.includes(stat.league.name))
}
