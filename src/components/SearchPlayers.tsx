import React, { useMemo, useState, useCallback } from "react"
import { Index } from "elasticlunr"
import styled from "styled-components"
import AutoSuggest from "react-autosuggest"
import debounce from "lodash.debounce"
import { navigate, prefetchPathname, useStaticQuery, graphql } from "gatsby"
import { motion, AnimatePresence } from "framer-motion"

export default function SearchPlayers() {
  const data = useStaticQuery(graphql`
    query IndexData {
      siteSearchIndex {
        index
      }
    }
  `)

  const index = useMemo(() => Index.load(data.siteSearchIndex.index), [])

  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])

  const getSuggestions = useCallback(
    debounce((input: any) => {
      setSuggestions(
        index
          .search(input.value, { expand: true })
          // Map over each ID and return the full document
          .map(({ ref }) => {
            const player = index.documentStore.getDoc(ref)

            return {
              name: player.name,
              team: player.team,
              id: player.id,
            }
          })
      )
    }, 200),
    [index]
  )

  return (
    <Styles>
      <AutoSuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={getSuggestions}
        onSuggestionsClearRequested={() => setSuggestions([])}
        onSuggestionSelected={(ev, data) => {
          navigate(`/player/${data.suggestion.id}`)
        }}
        onSuggestionHighlighted={data => {
          if (data.suggestion) {
            prefetchPathname(`/player/${data.suggestion.id}`)
          }
        }}
        getSuggestionValue={(suggestion: any) => suggestion.name}
        renderSuggestion={(suggestion: any) => {
          return <span>{suggestion.name}</span>
        }}
        renderSuggestionsContainer={useMemo(
          () => ({ containerProps, children }) => {
            return (
              <AnimatePresence>
                {children && (
                  <motion.div
                    {...containerProps}
                    initial={{
                      height: 0,
                      overflow: "hidden",
                      opacity: 0,
                    }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{
                      height: 0,
                      overflow: "hidden",
                      opacity: 0,
                    }}
                    transition={{ duration: 0.15 }}
                  >
                    {children}
                  </motion.div>
                )}
              </AnimatePresence>
            )
          },
          []
        )}
        inputProps={{
          value: query,
          onChange: (ev, { newValue }) => setQuery(newValue),
          placeholder: "Search for a player",
        }}
      />
    </Styles>
  )
}

const Styles = styled.div`
  .react-autosuggest__container {
    position: relative;
  }

  .react-autosuggest__input {
    height: 30px;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #aaa;
    border-radius: 4px;
  }

  .react-autosuggest__input--focused {
    outline: none;
  }

  .react-autosuggest__input--open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .react-autosuggest__suggestions-container {
    display: none;
  }

  .react-autosuggest__suggestions-container--open {
    display: block;
    position: absolute;
    top: 47px;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #aaa;
    background-color: #fff;
    font-weight: 400;
    font-size: 16px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    z-index: 2;
  }

  .react-autosuggest__suggestions-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
    max-height: 200px;
    overflow-y: auto;
  }

  .react-autosuggest__suggestion {
    cursor: pointer;
    padding: 10px 20px;
  }

  .react-autosuggest__suggestion--highlighted {
    background-color: #ddd;
  }
`
