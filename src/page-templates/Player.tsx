import React, { useState, useMemo, useEffect, useRef } from "react"
import styled from "styled-components"
import { useTabState, Tab, TabList, TabPanel } from "reakit/Tab"
import PlayerStatsTable from "../components/PlayerStatsTable"
import Img from "gatsby-image"
import { Checkbox } from "reakit/Checkbox"
import usePlayerStatFilters, {
  getDefaultFilters,
  getAllLeagueNames,
} from "../hooks/usePlayerStatFilters"

interface PlayerPageProps {
  pageContext: {
    player: {
      fullName: string
      childrenPlayerStats: any
      headshotImage: {
        childImageSharp: {
          fixed: any
        }
      }
      primaryPosition: {
        code: string
        name: string
      }
      currentTeam: {
        name: string
      }
    }
  }
}

export default function Player({ pageContext: { player } }: PlayerPageProps) {
  const {
    fullName,
    childrenPlayerStats: stats,
    primaryPosition,
    currentTeam,
  } = player

  const tab = useTabState({ selectedId: "stats" })

  const allLeaguesCheckboxRef = useRef(null)
  const [filters, setFilters] = useState(getDefaultFilters(stats))
  const filteredStats = usePlayerStatFilters({
    stats,
    filters,
  })

  const allLeagueNames = useMemo(() => getAllLeagueNames(stats), [stats])

  // manage "all leagues" checkbox indeterminate state
  useEffect(() => {
    allLeaguesCheckboxRef.current.indeterminate =
      filters.leagues.length > 0 &&
      filters.leagues.length !== allLeagueNames.length
  }, [filters, allLeagueNames])

  return (
    <Root>
      <Header>
        <Headshot
          loading="eager"
          fixed={player.headshotImage.childImageSharp.fixed}
          alt={fullName}
          title={fullName}
        />
        <HeaderBanner>
          <h1>{fullName}</h1>
          <h5 className="subtitle">
            {currentTeam.name} | {primaryPosition.name}
          </h5>
        </HeaderBanner>
      </Header>
      <StyledTabList {...tab} aria-label="My tabs">
        <StyledTab {...tab} stopId="stats">
          Stats
        </StyledTab>
      </StyledTabList>
      <TabPage>
        <TabPanel {...tab} stopId="stats">
          <Filters>
            <label className="all">
              <Checkbox
                ref={allLeaguesCheckboxRef}
                checked={
                  !filters.leagues ||
                  filters.leagues.length === allLeagueNames.length
                }
                onChange={ev =>
                  setFilters({
                    ...filters,
                    leagues: !ev.target.checked ? [...allLeagueNames] : [],
                  })
                }
              />{" "}
              All Leagues
            </label>
            {allLeagueNames.map(name => (
              <label key={name}>
                <Checkbox
                  checked={!filters.leagues || filters.leagues.includes(name)}
                  onChange={ev =>
                    setFilters({
                      ...filters,
                      leagues: !ev.target.checked
                        ? [...filters.leagues, name]
                        : filters.leagues.filter(league => league !== name),
                    })
                  }
                />{" "}
                {name}
              </label>
            ))}
          </Filters>
          <StyledPlayerStatsTable showFilters stats={filteredStats} />
        </TabPanel>
      </TabPage>
    </Root>
  )
}

const Root = styled.div`
  width: fit-content;
  margin: auto;
`

const Header = styled.div`
  height: 160px;
  width: 100%;
  display: flex;
`

const HeaderBanner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto 0;
  z-index: 0;
  padding: ${props => props.theme.spacing()} 0;
  padding-left: ${props => props.theme.spacing(2)};
  color: ${props => props.theme.colors.text.primary};

  .subtitle {
    margin: 0;
    margin-left: ${props => props.theme.spacing(0.5)};
    margin-top: ${props => props.theme.spacing()};
    text-transform: uppercase;
    color: ${props => props.theme.colors.text.subtitle};
  }
`

const Headshot = styled(Img)`
  ${props => props.theme.shadow[1]};
  ${props => props.theme.outline};
  border-radius: 50%;
  z-index: 1;
`

const StyledTabList = styled(TabList)`
  margin-top: ${props => props.theme.spacing(4)};
`

const StyledTab = styled(Tab)`
  background: none;
  color: ${props => props.theme.colors.text.primary};
  border: none;
  border-bottom: 1px;
  cursor: pointer;
  font-weight: normal;
  font-size: ${props => props.theme.font.size.button};
  text-transform: uppercase;
  margin-bottom: ${props => props.theme.spacing(2)};
  margin-right: ${props => props.theme.spacing()};

  &[aria-selected="true"] {
    font-weight: bold;
    border-bottom: 3px solid ${props => props.theme.colors.text.primary};
  }
`

const TabPage = styled.div`
  max-width: 90vw;
`

const StyledPlayerStatsTable = styled(PlayerStatsTable)`
  ${props => props.theme.shadow[1]};
  ${props => props.theme.outline};
  border-radius: 5px;
`

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;

  .all {
    width: 100%;
  }

  label {
    margin: ${props => props.theme.spacing()};
  }
`
