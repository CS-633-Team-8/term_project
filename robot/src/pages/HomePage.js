import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from '@atlaskit/theme';
import Elephant from '../components/Elephant'
//import Cards from './Cards';
import { DESKTOP_BREAKPOINT_MIN } from '../constants';
import Cards from '../components/Cards'

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

  // TODO: Add Helmet
  render() {
    return (
      <HomePageWrapper>
        <Style />
        <Title data-testid="title">I'm asking Harold</Title>
        <Intro>
          Your friendly knowledgable Elephant UNDER DEVELOPMENT.
        </Intro>
        <Elephant />
        <Cards />
      </HomePageWrapper>
    );
  }
}
