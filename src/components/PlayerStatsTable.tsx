/* eslint-disable react/jsx-key */
import React, { useMemo, useState } from "react"
import styled from "styled-components"
import Table from "@material-ui/core/Table"
import TableHead from "@material-ui/core/TableHead"
import TableBody from "@material-ui/core/TableBody"
import TableRow from "@material-ui/core/TableRow"
import TableCell, { TableCellProps } from "@material-ui/core/TableCell"
import TableSortLabel from "@material-ui/core/TableSortLabel"
import { Hidden } from "reakit"
import get from "lodash.get"

const columns = [
  {
    id: "season",
    label: "Season",
    render: season => {
      return `${season.slice(0, 4)}-${season.slice(6)}`
    },
  },
  {
    id: "league.name",
    label: "League",
    render: league => {
      switch (league) {
        case "National Hockey League":
          return "NHL"
      }

      return league
    },
  },
  {
    id: "team.name",
    label: "Team",
  },
  {
    id: "stat.games",
    label: "GP",
    align: "right",
  },
  {
    id: "stat.assists",
    label: "A",
    align: "right",
  },
  {
    id: "stat.goals",
    label: "G",
    align: "right",
  },
  {
    id: "stat.points",
    label: "P",
    align: "right",
  },
  {
    id: "stat.plusMinus",
    label: "+/-",
    align: "right",
  },
  {
    id: "stat.penaltyMinutes",
    label: "PIM",
    align: "right",
  },
  {
    id: "stat.powerPlayPoints",
    label: "PPP",
    align: "right",
  },
  {
    id: "stat.shortHandedPoints",
    label: "SHP",
    align: "right",
  },
  {
    id: "stat.gameWinningGoals",
    label: "GWG",
    align: "right",
  },
  {
    id: "stat.shotPct",
    label: "S%",
    align: "right",
    render: value => (value ? `${value}%` : null),
  },
  {
    id: "stat.faceOffPct",
    label: "FO%",
    align: "right",
    render: value => (value ? `${value}%` : null),
  },
]
export default function PlayerStatsTable({ stats }: { stats: any }) {
  const [sort, setSort] = useState("season")
  const [order, setOrder] = useState<"asc" | "desc">("desc")

  const createSortHandler = property => () => {
    if (property === sort) {
      setOrder(order === "asc" ? "desc" : "asc")
    } else {
      setOrder("desc")
    }

    setSort(property)
  }

  const data = useMemo(() => {
    const extendedStats = stats.map(({ stat, ...year }) => {
      const points = addSafely(stat.goals, stat.assists)
      const powerPlayPoints = addSafely(
        stat.powerPlayGoals,
        stat.powerPlayAssists
      )
      const shortHandedPoints = addSafely(
        stat.shortHandedGoals,
        stat.shortHandedAssists
      )

      return {
        ...year,
        stat: {
          ...stat,

          points,
          powerPlayPoints,
          shortHandedPoints,
        },
      }
    })

    return extendedStats.sort((a, b) => {
      const dir = order === "asc" ? 1 : -1

      return (get(a, sort, 0) > get(b, sort, 0) ? 1 : -1) * dir
    })
  }, [stats, sort, order])

  return (
    <Root>
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns.map(({ label, id, render, ...columnProps }) => (
              <HeaderCell key={id} {...(columnProps as any)}>
                <TableSortLabel
                  active={sort === id}
                  direction={order}
                  onClick={createSortHandler(id)}
                >
                  {label}
                  {sort === id ? (
                    <Hidden>
                      <span>
                        {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </span>
                    </Hidden>
                  ) : null}
                </TableSortLabel>
              </HeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(d => (
            <TableRow key={`${d.season}-${d.sequenceNumber}`}>
              {columns.map(({ id, render, label, ...columnProps }) => (
                <StyledTableCell key={id} {...(columnProps as any)}>
                  {render ? render(get(d, id)) : get(d, id)}
                </StyledTableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Root>
  )
}

function addSafely(...nums) {
  const allInvalid = nums.every(num => num === undefined || num === null)

  if (allInvalid) {
    return undefined
  }

  return nums.reduce((total, num) => total + (num || 0), 0)
}

const Root = styled.div`
  overflow-x: scroll;
`

const StyledTableCell = styled(TableCell)`
  white-space: nowrap;
`

const HeaderCell = styled(StyledTableCell)`
  span {
    font-weight: 700;
  }
`