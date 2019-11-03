/* eslint-disable react/jsx-key */
import React, { useMemo } from "react"
import { useTable, Column } from "react-table"
import styled from "styled-components"

export default function PlayerStatsTable({ stats }: { stats: any }) {
  console.log(stats)
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns: useMemo(
      () =>
        [
          {
            Header: "Season",
            id: "season",
            accessor: ({ season }) => {
              return `${season.slice(0, 4)}-${season.slice(6)}`
            },
          },
          {
            Header: "GP",
            id: "games-played",
            accessor: "stat.games",
            props: {
              style: {
                textAlign: "end",
              },
            },
            // accessor: ({ stat }) => {
            //   return stat
            // },
          },
        ] as Column<any>[],
      []
    ),
    data: stats.yearByYear,
  })

  return (
    <Table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

const Table = styled.table`
  border-spacing: 0;
  border: 1px solid black;

  tr {
    :last-child {
      td {
        border-bottom: 0;
      }
    }
  }

  th,
  td {
    margin: 0;
    padding: 0.5rem;
    border-bottom: 1px solid black;
    border-right: 1px solid black;

    :last-child {
      border-right: 0;
    }
  }
`
