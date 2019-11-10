/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Normalize } from "styled-normalize"
import Header from "./Header"
import Theme from "./Theme"
import "./layout.css"
import styled from "styled-components"

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 1280px;
  padding: 0px 1.0875rem 1.45rem;
  padding-top: 0;
`

const Layout: React.FC = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Theme>
      <Normalize />
      <Header siteTitle={data.site.siteMetadata.title} />
      <Wrapper>
        <main>{children}</main>
        {/* <footer>© {new Date().getFullYear()}</footer> */}
      </Wrapper>
    </Theme>
  )
}

export default Layout
