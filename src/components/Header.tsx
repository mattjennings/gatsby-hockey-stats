import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import SearchPlayers from "./SearchPlayers"

const StyledHeader = styled.header`
  background: rebeccapurple;
  margin-bottom: 1.45rem;
`

const Header = ({ siteTitle }: any) => {
  return (
    <StyledHeader>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 1280,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <h1
          style={{
            margin: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
          <SearchPlayers />
        </h1>
      </div>
    </StyledHeader>
  )
}

export default Header
