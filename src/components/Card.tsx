import styled from "styled-components"

const Card = styled.div`
  ${props => props.theme.shadow[0]};
  ${props => props.theme.outline};
  border-radius: 5px;
  padding: ${props => props.theme.spacing()};
`

export default Card
