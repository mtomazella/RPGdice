import { mediaQueries } from 'style/mediaQueries'
import styled from 'styled-components'

const diceBoxHeight = '15rem'

export const Column = styled.section`
  width: 100%;
  padding: 2rem 1rem;

  @media ${mediaQueries.desktop} {
    width: 50%;
  }
`

export const StyledSpace = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media ${mediaQueries.desktop} {
    flex-direction: row-reverse;
  }

  dic.space-options {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  div.dice-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: ${diceBoxHeight};
  }

  div.search-bar {
    padding: 1rem;
  }

  div.MuiCard-root {
    margin: 1rem 0;
  }

  .expression-builder > div.MuiCardActions-root {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding-right: 1.9rem;
    width: 100%;

    > div:last-of-type {
      padding-top: 5px;
    }
  }
`
