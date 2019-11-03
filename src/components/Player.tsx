import React from "react"
import Layout from "../components/Layout"
import styled from "styled-components"
import { useTabState, Tab, TabList, TabPanel } from "reakit/Tab"
import PlayerStatsTable from "./PlayerStatsTable"
import Avatar from "@material-ui/core/Avatar"

interface PlayerPageProps {
  pageContext: {
    player: {
      fullName: string
      stats: any
      headshot: {
        sm: string
        md: string
        lg: string
      }
    }
  }
}

export default function Player({ pageContext: { player } }: PlayerPageProps) {
  const tab = useTabState({ selectedId: "stats" })

  const { headshot, fullName, stats } = player

  return (
    <Layout>
      <Header>
        <Headshot src={headshot.md} alt={fullName} title={fullName} />
        <HeaderBanner>
          <h1>{fullName}</h1>
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
      <TabPage>
        <TabPanel {...tab} stopId="stats">
          <PlayerStatsTable stats={stats[0].splits} />
        </TabPanel>
        <TabPanel {...tab} stopId="profile">
          todo
        </TabPanel>
      </TabPage>
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
  margin: auto 0;
  padding: ${props => props.theme.spacing()} 0;
  z-index: 0;
  padding-left: ${props => props.theme.spacing(2)};
  border-radius: 5px;
  color: ${props => props.theme.colors.text.primary};
`

const Headshot = styled(Avatar)`
  ${props => props.theme.shadow[1]};
  ${props => props.theme.outline};
  width: 160px !important;
  height: 160px !important;
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
  ${props => props.theme.shadow[1]};
  ${props => props.theme.outline};
  border-radius: 5px;
`
