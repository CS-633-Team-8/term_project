import React from "react"
import styled from "styled-components"
import { colors } from "@atlaskit/theme"
import { Grid, GridColumn } from "@atlaskit/page"
import Elephant from "../../../components/Elephant"
import Cards from "../../../components/Cards"
import ChatWindow from "../../../components/ChatWindow"

const fonts =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'

const Title = styled.h1`
  color: ${colors.N0};
  font-family: "Charlie_Display_Semibold", ${fonts}; /* stylelint-disable-line */
  font-size: 52px;
  margin: 80px 0 0 !important;
  letter-spacing: 0;
`

export default function MobileLayout(props) {
  return (
    <Grid spacing="compact">
      <GridColumn medium={6}>
        <Title data-testid="title">I'm asking Harold</Title>
      </GridColumn>
      <GridColumn medium={6}>
        <Elephant />
      </GridColumn>

      <GridColumn medium={12}>
        <ChatWindow sendCardData={props.sendData} />
      </GridColumn>
      <Cards data={props.cardData} />
    </Grid>
  )
}
