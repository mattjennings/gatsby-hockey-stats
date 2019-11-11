/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Header from "../components/Header"
import Theme from "../components/Theme"
import styled from "styled-components"

const Root = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
  margin: 0 auto;
  padding: ${props => props.theme.spacing(2)};
  padding-top: 0;
  flex-grow: 1;
  max-width: 1280px;
  width: 100%;
`

const Footer = styled.footer`
  background: #222222;
  text-align: center;
  padding: ${props => props.theme.spacing(2)};
  font-weight: 400;
  color: #f2f2f2;

  a {
    color: inherit;
  }
`

const Layout: React.FC = ({ children }) => {
  return (
    <Theme>
      <Root>
        <Header />
        <Main>{children}</Main>
        <Footer>
          <a
            href="https://github.com/mattjennings/gatsby-hockey-stats"
            title="GitHub Repository"
          >
            View on GitHub
          </a>
          <br />
          <br />
          Created by{" "}
          <a
            href="https://twitter.com/mattjennings44"
            title="Matt Jennings on Twitter"
          >
            @mattjennings44
          </a>{" "}
        </Footer>
      </Root>
    </Theme>
  )
}

export default Layout
