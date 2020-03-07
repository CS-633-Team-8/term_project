import React from "react"
import styled from "styled-components"
import { Grid, GridColumn } from "@atlaskit/page"
import { gridSize } from "@atlaskit/theme"

const Padding = styled.div`
  margin: ${gridSize() * 1}px ${gridSize() * 1}px;
  padding-bottom: ${gridSize() * 1}px;
`

export default ({ children }) => (
  <Grid>
    <GridColumn>
      <Padding>{children}</Padding>
    </GridColumn>
  </Grid>
)
