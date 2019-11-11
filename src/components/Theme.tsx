import React from "react"
import {
  ThemeProvider,
  DefaultTheme,
  createGlobalStyle,
} from "styled-components"
import { Normalize } from "styled-normalize"

const theme: DefaultTheme = {
  outline: "border: 1px solid rgba(0, 0, 0, 0.1)",
  shadow: [
    "box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    "box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    "box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    "box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  ],
  spacing: (amount = 1) => `${amount * 8}px`,
  font: {
    size: {
      button: "16px",
      body: "8px",
    },
  },
  colors: {
    text: {
      primary: "rgba(0,0,0, 0.85)",
      subtitle: "rgba(0,0,0, 0.6)",
    },
    grey: [
      "#fafafa",
      "#f5f5f5",
      "#eeeeee",
      "#e0e0e0",
      "#bdbdbd",
      "#9e9e9e",
      "#757575",
      "#616161",
      "#424242",
      "#212121",
    ],
  },
}

const GlobalStyle = createGlobalStyle`
  html {
    font-family: "Montserrat", sans-serif;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }

  body {
    
  }
  h1 {
    margin: 0;
}
`

export default function Theme({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <>
        <Normalize />

        <GlobalStyle />
        {children}
      </>
    </ThemeProvider>
  )
}

declare module "styled-components" {
  export interface DefaultTheme {
    shadow: string[]
    outline: string
    spacing: (amount?: number) => string
    font: {
      size: {
        button: string
        body: string
      }
    }
    colors: {
      text: {
        primary: string
        subtitle: string
      }
      grey: string[]
    }
  }
}
