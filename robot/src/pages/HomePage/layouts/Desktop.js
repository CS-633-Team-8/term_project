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
const Intro = styled.div`
  color: ${colors.N0};
  display: inline-block;
  font-size: 24px;
  font-family: "Charlie_Display_Regular", ${fonts}; /* stylelint-disable-line */
  font-weight: 300;
  margin-bottom: 80px;
  margin-top: 24px;
  max-width: 640px;
  letter-spacing: 0;

  a {
    color: ${colors.B75};

    &:hover {
      color: ${colors.N0};
    }
  }
`
export default function DesktopLayout(props) {
  return (
    <Grid spacing="compact">
      <GridColumn medium={12}>
        <Title data-testid="title">I'm asking Harold</Title>
        <Intro>Your friendly knowledgable Elephant UNDER DEVELOPMENT.</Intro>
      </GridColumn>
      <GridColumn medium={6} small={12}>
        <Elephant />
      </GridColumn>
      <GridColumn medium={4} small={12}>
        <ChatWindow sendCardData={props.sendData} />
      </GridColumn>
      <Cards data={props.cardData} />
    </Grid>
  )
}
