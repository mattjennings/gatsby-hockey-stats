import React from "react"
import Layout from "../components/Layout"
import styled from "styled-components"
import { useTabState, Tab, TabList, TabPanel } from "reakit/Tab"
import PlayerStatsTable from "./PlayerStatsTable"

interface PlayerPageProps {
  pageContext: {
    playerId: number
    playerName: string
    stats: any
  }
}

export default function Player({
  pageContext: { playerId, playerName, stats },
}: PlayerPageProps) {
  const tab = useTabState({ selectedId: "stats" })
  const img = `https://nhl.bamcontent.com/images/headshots/current/168x168/${playerId}@2x.jpg`

  return (
    <Layout>
      <Header>
        <Headshot src={img} alt={playerName} title={playerName} />
        <HeaderBanner>
          <h1>{playerName}</h1>
        </HeaderBanner>
      </Header>
      <StyledTabList {...tab} aria-label="My tabs">
        <StyledTab {...tab} stopId="stats">
          Stats
        </StyledTab>
        <StyledTab {...tab} stopId="profile">
          Profile
        </StyledTab>
      </StyledTabList>
      <TabPanel {...tab} stopId="stats">
        <PlayerStatsTable stats={stats} />
      </TabPanel>
      <TabPanel {...tab} stopId="profile">
        Tab 2
      </TabPanel>
    </Layout>
  )
}

const Header = styled.div`
  height: 160px;
  width: 100%;
  display: flex;
`

const HeaderBanner = styled.div`
  display: flex;
  height: 60%;
  width: 100%;
  margin: auto 0;
  padding: ${props => props.theme.spacing()} 0;
  z-index: 0;
  padding-left: 40px;
  border-radius: 5px;
  color: ${props => props.theme.colors.text.primary};
`

const Headshot = styled.img`
  ${props => props.theme.shadow[1]};
  ${props => props.theme.outline};
  border-radius: 50%;
  object-fit: contain;
  margin-right: -30px;
  width: 160px;
  height: 160px;
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
