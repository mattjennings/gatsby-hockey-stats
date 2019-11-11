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
          fluid(maxWidth: 125) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }

      logoWithName: file(relativePath: { eq: "logo-with-name.png" }) {
        childImageSharp {
          fluid(maxWidth: 125) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }

      logoWithNameWhite: file(
        relativePath: { eq: "logo-with-name-white.png" }
      ) {
        childImageSharp {
          fluid(maxWidth: 125) {
            ...GatsbyImageSharpFluid_noBase64
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
      fluid={data[logoKey].childImageSharp.fluid}
      alt="Hockey Stats Logo"
      title="Hockey Stats Logo"
      {...imgProps}
    />
  )
}
