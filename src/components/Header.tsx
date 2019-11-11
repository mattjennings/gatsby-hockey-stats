import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import SearchPlayers from "./SearchPlayers"
import Logo from "./Logo"
import useMediaQuery from "@material-ui/core/useMediaQuery"

const StyledHeader = styled.header`
  background: #222222;
  margin-bottom: 1.45rem;
`

const HeaderContents = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: 1280px;
  padding: ${props => props.theme.spacing()};

  a {
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    text-decoration: none;
  }
`

const StyledLogo = styled(Logo)`
  width: 80px;
  height: 80px;

  @media (max-width: 600px) {
    width: 60px;
    height: 60px;
  }
`

const Header = () => {
  const isMobile = useMediaQuery("(max-width:600px)")
  return (
    <StyledHeader>
      <HeaderContents>
        <Link to="/">
          <StyledLogo withName={!isMobile} white />
        </Link>
        <SearchPlayers />
      </HeaderContents>
    </StyledHeader>
  )
}

export default Header
