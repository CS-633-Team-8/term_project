import React from "react"
import styled from "styled-components"
import Spinner from "@atlaskit/spinner"

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 80vh;
  justify-content: center;
`
const Loading = ({ size, ...rest }) => (
  <Container>
    <Spinner size={size || "large"} {...rest} />
  </Container>
)
export default Loading
