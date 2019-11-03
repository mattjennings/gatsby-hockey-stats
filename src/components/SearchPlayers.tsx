import React, { useMemo, useState, useEffect, useCallback } from "react"
import { Index } from "elasticlunr"
import styled from "styled-components"
import AutoSuggest from "react-autosuggest"
import { Link } from "gatsby"
import debounce from "lodash.debounce"

export default function SearchPlayers({ searchIndex }: any) {
  const index = useMemo(() => Index.load(searchIndex), [searchIndex])

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
              id: player.playerId,
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
        getSuggestionValue={(suggestion: any) => suggestion.name}
        renderSuggestion={(suggestion: any) => {
          return <Link to={`/player/${suggestion.id}`}>{suggestion.name}</Link>
        }}
        inputProps={{
          value: query,
          onChange: (ev, { newValue }) => setQuery(newValue),
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
    width: 240px;
    height: 30px;
    padding: 10px 20px;
    font-family: Helvetica, sans-serif;
    font-weight: 300;
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
    top: 51px;
    width: 280px;
    border: 1px solid #aaa;
    background-color: #fff;
    font-family: Helvetica, sans-serif;
    font-weight: 300;
    font-size: 16px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    z-index: 2;
  }

  .react-autosuggest__suggestions-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .react-autosuggest__suggestion {
    cursor: pointer;
    padding: 10px 20px;
  }

  .react-autosuggest__suggestion--highlighted {
    background-color: #ddd;
  }
`
