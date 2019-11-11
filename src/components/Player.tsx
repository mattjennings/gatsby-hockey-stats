import React from "react"
import styled from "styled-components"
import { useTabState, Tab, TabList, TabPanel } from "reakit/Tab"
import PlayerStatsTable from "./PlayerStatsTable"
import Img from "gatsby-image"

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
    }
  }
}

export default function Player({ pageContext: { player } }: PlayerPageProps) {
  const tab = useTabState({ selectedId: "stats" })

  const { fullName, childrenPlayerStats } = player

  return (
    <>
      <Header>
        <Headshot
          critical
          fixed={player.headshotImage.childImageSharp.fixed}
          alt={fullName}
          title={fullName}
        />
        <HeaderBanner>
          <h1>{fullName}</h1>
        </HeaderBanner>
      </Header>
      <StyledTabList {...tab} aria-label="My tabs">
        <StyledTab {...tab} stopId="stats">
          Stats
        </StyledTab>
      </StyledTabList>
      <TabPage>
        <TabPanel {...tab} stopId="stats">
          <PlayerStatsTable stats={childrenPlayerStats} />
        </TabPanel>
      </TabPage>
    </>
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

const Headshot = styled(Img)`
  ${props => props.theme.shadow[1]};
  ${props => props.theme.outline};
  border-radius: 50%;
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

const TabPage = styled.div`
  ${props => props.theme.shadow[1]};
  ${props => props.theme.outline};
  border-radius: 5px;
`
