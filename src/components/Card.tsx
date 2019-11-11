import styled from "styled-components"

export const CardContent = styled.div``

const Card = styled.div`
  ${props => props.theme.shadow[0]};
  ${props => props.theme.outline};
  border-radius: 5px;

  ${CardContent} {
    padding: ${props => props.theme.spacing()};
  }
`

export default Card
