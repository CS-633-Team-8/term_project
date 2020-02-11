import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from '@atlaskit/theme';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import Elephant from '../components/Elephant'
import { DESKTOP_BREAKPOINT_MIN, MOBILE_BREAKPOINT_MAX, BASE_TITLE } from '../constants';
import Cards from '../components/Cards'
import ChatWindow from '../components/ChatWindow'
import debounce from 'lodash.debounce';
import { Helmet } from 'react-helmet';

const fonts =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

const Title = styled.h1`
  color: ${colors.N0};
  font-family: 'Charlie_Display_Semibold', ${fonts}; /* stylelint-disable-line */
  font-size: 52px;
  margin: 80px 0 0 !important;
  letter-spacing: 0;
`;
const Intro = styled.div`
  color: ${colors.N0};
  display: inline-block;
  font-size: 24px;
  font-family: 'Charlie_Display_Regular', ${fonts}; /* stylelint-disable-line */
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
`;

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
`;

const Style = () => (
  <style>{`
  body {
    background-color: ${colors.B500};
  }
`}</style>
);


export default class HomePage extends Component {
  static contextTypes = {
    showModal: PropTypes.func,
    addFlag: PropTypes.func,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    onClose: PropTypes.func,
  };

  constructor() {
    super(...arguments);
    this.state = {
        isMobile: false,
    };
    this.detectWidth = () => {
      const width = window.innerWidth;
      if (width <= MOBILE_BREAKPOINT_MAX) {
          this.setState({ isMobile: true });
      } else {
        this.setState({ isMobile: false });
      }
    };
  };

  componentDidMount() {
    this.debouncedDetect = debounce(this.detectWidth, 500);
    window.addEventListener('resize', this.debouncedDetect);
  }
  componentWillUnmount() {
    if (this.debouncedDetect) {
      window.removeEventListener('resize', this.debouncedDetect);
    }
  }

  render() {
    const renderLayout = () => {
      if (!this.state.isMobile) {
        console.log("is not Mobile")
        return (
          <Grid spacing="compact">
          <GridColumn medium={12}>
          <Title data-testid="title">I'm asking Harold</Title>
          <Intro>
            Your friendly knowledgable Elephant UNDER DEVELOPMENT.
          </Intro>
         
          </GridColumn>
          <GridColumn medium={6} small={12}>
            <Elephant />
          </GridColumn>
          
          <GridColumn medium={4} small={12}  >
            <ChatWindow />
          </GridColumn>
          <Cards />
          </Grid>
        ) 
      } else {
        console.log("is Mobile")
        return (
          <Grid spacing="compact">
          <GridColumn medium={6}>
          <Title data-testid="title">I'm asking Harold</Title>
         
          </GridColumn>
          <GridColumn medium={6} >
            <Elephant />
          </GridColumn>
          
          <GridColumn medium={12} >
            <ChatWindow />
          </GridColumn>
          <Cards />
          </Grid>
        )
      }
    }

    return (
      <div>
        <Helmet>
            <title>{`${BASE_TITLE}`}</title>
          </Helmet>
        <HomePageWrapper>
          <Style />
          <Page>
            {renderLayout()}
          </Page>
        </HomePageWrapper>
      </div>
    );
  }
}
