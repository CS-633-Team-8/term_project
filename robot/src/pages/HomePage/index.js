import PropTypes from "prop-types"
import React, { Component } from "react"
import styled from "styled-components"
import { colors } from "@atlaskit/theme"
import Page from "@atlaskit/page"
import debounce from "lodash.debounce"
import { Helmet } from "react-helmet"
import {
  DESKTOP_BREAKPOINT_MIN,
  MOBILE_BREAKPOINT_MAX,
  BASE_TITLE
} from "../../constants"
import DesktopLayout from "./layouts/Desktop"
import MobileLayout from "./layouts/Mobile"

const HomePageWrapper = styled.div`
  margin: 0 auto;
  text-align: center;
  color: ${colors.N0};

  @media (min-width: ${DESKTOP_BREAKPOINT_MIN}px) {
    margin-right: 64px;
  }

  @media (max-width: ${DESKTOP_BREAKPOINT_MIN}px) {
    margin: 12px;
  }
`

const Style = () => (
  <style>{`
  body {
    background-color: ${colors.B500};
  }
`}</style>
)

export default class HomePage extends Component {
  static contextTypes = {
    showModal: PropTypes.func,
    addFlag: PropTypes.func,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    onClose: PropTypes.func
  }

  constructor() {
    super(...arguments)
    this.state = {
      isMobile: false,
      cardsData: []
    }

    // Method to allow for mobile responsiveness
    this.detectWidth = () => {
      const width = window.innerWidth
      if (width <= MOBILE_BREAKPOINT_MAX) {
        this.setState({ isMobile: true })
      } else {
        this.setState({ isMobile: false })
      }
    }

    // Callback to allow char bot to send card data
    this.sendCardData = (data, type) => {
      if (data != null) {
        console.log("Card Data Sent in Callback: ", data, type)
        this.setState({ cardsData: data })
      } else {
        console.log("Removing News card ", data, type)
        this.setState({ cardsData: [] })
      }
    }
  }

  componentDidMount() {
    this.debouncedDetect = debounce(this.detectWidth, 500)
    window.addEventListener("resize", this.debouncedDetect)
    this.detectWidth()
  }

  componentWillUnmount() {
    if (this.debouncedDetect) {
      window.removeEventListener("resize", this.debouncedDetect)
    }
  }

  render() {
    const renderLayout = () => {
      if (!this.state.isMobile) {
        return (
          <DesktopLayout
            cardData={this.state.cardsData}
            sendData={this.sendCardData.bind(this)}
          />
        )
      }
      return (
        <MobileLayout
          cardData={this.state.cardsData}
          sendData={this.sendCardData.bind(this)}
        />
      )
    }

    return (
      <div>
        <Helmet>
          <title>{`${BASE_TITLE}`}</title>
        </Helmet>
        <HomePageWrapper>
          <Style />
          <Page>{renderLayout()}</Page>
        </HomePageWrapper>
      </div>
    )
  }
}
