import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img, { GatsbyImageProps } from "gatsby-image"

export interface LogoProps extends GatsbyImageProps {
  withName?: boolean
  white?: boolean
}

export default function Logo({ withName, white, ...imgProps }: LogoProps) {
  const data = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fixed(width: 80) {
            ...GatsbyImageSharpFixed
          }
        }
      }

      logoWithName: file(relativePath: { eq: "logo-with-name.png" }) {
        childImageSharp {
          fixed(width: 80) {
            ...GatsbyImageSharpFixed
          }
        }
      }

      logoWithNameWhite: file(
        relativePath: { eq: "logo-with-name-white.png" }
      ) {
        childImageSharp {
          fixed(width: 80) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  let logoKey = "logo"
  if (withName) {
    logoKey = white ? "logoWithNameWhite" : "logoWithName"
  }

  return (
    <Img
      fixed={data[logoKey].childImageSharp.fixed}
      alt="Hockey Stats Logo"
      title="Hockey Stats Logo"
      {...imgProps}
    />
  )
}
