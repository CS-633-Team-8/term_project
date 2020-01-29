import React from 'react';
import styled, { keyframes, css } from 'styled-components';
//import { Link } from '../../components/WrappedLink';
import { gridSize, colors } from '@atlaskit/theme';
import debounce from 'lodash.debounce';

//import { AtlassianIcon } from '@atlaskit/logo';
import PackagesIcon from '@atlaskit/icon/glyph/component';
import BlogIcon from '@atlaskit/icon/glyph/component';
import MediaDocIcon from '@atlaskit/icon/glyph/media-services/document';
import CodeIcon from '@atlaskit/icon/glyph/code';
import DocumentIcon from '@atlaskit/icon/glyph/document-filled';

// import rocket from '../../assets/Rocket.png';
// import platform from '../../assets/Platform.png';
// import multiTool from '../../assets/multiTool.png';

import {
  MOBILE_BREAKPOINT_MAX,
  TABLET_BREAKPOINT_MIN,
  TABLET_BREAKPOINT_MAX,
} from '../constants';

const CardIcon = styled.span`
  align-items: center;
  background-color: ${p => p.color};
  border-radius: 4px;
  border: 2px solid ${colors.N0};
  display: flex;
  height: 24px;
  justify-content: center;
  margin-right: 8px;
  width: 24px;
`;

const cardVerticalAnimationDistance = gridSize() * 7.5;

const loadInAnimation = keyframes`
  0% {
    top: ${cardVerticalAnimationDistance}px;
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    top: 0;
    opacity: 1;
  }
`;

export const CardsWrapper = styled.div`
  display: flex;
  max-width: 980px;
  justify-content: center;
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: ${MOBILE_BREAKPOINT_MAX}px) {
    margin-top: 0;
  }
`;

export const CardColumn = styled.div`
  flex: 0 0 0;
`;

const TransparentCardStyles = css`
  display: inline-block;
  width: 300px;
  border-radius: 3px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background-color: ${colors.N0};
  margin: ${gridSize}px;
  background-repeat: no-repeat;
  opacity: 0;
  top: ${cardVerticalAnimationDistance}px;
  color: ${colors.N900};
  animation: ${loadInAnimation} 0.6s cubic-bezier(0.15, 1, 0.33, 1) forwards;
  box-sizing: border-box;
  text-align: left;

  z-index: 100;
  box-shadow: 0 1px 1px rgba(23, 43, 77, 0.2),
    0 0 0.5px 0 rgba(23, 43, 77, 0.25);
  transition: all 0.3s cubic-bezier(0.15, 1, 0.33, 1);

  @media (max-width: ${TABLET_BREAKPOINT_MIN}px) {
    display: block;
    margin: ${gridSize() * 3}px ${gridSize}px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px -2px rgba(23, 43, 77, 0.32),
      0 0 1px rgba(23, 43, 77, 0.25);
    text-decoration: none;
    color: ${colors.N900};
  }

  animation-delay: ${( index ) =>
    0.5 + 0.03 * (index || 0)}s;
  background-size: contain;
  background-position: bottom;
`;

const BaseCardStyles = css`
  display: inline-block;
  width: 300px;
  border-radius: 3px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background-color: ${colors.N0};
  margin: ${gridSize}px;
  background-repeat: no-repeat;
  opacity: 0;
  top: ${cardVerticalAnimationDistance}px;
  color: ${colors.N900};
  animation: ${loadInAnimation} 0.6s cubic-bezier(0.15, 1, 0.33, 1) forwards;
  box-sizing: border-box;
  text-align: left;

  z-index: 100;
  box-shadow: 0 1px 1px rgba(23, 43, 77, 0.2),
    0 0 0.5px 0 rgba(23, 43, 77, 0.25);
  transition: all 0.3s cubic-bezier(0.15, 1, 0.33, 1);

  @media (max-width: ${TABLET_BREAKPOINT_MIN}px) {
    display: block;
    margin: ${gridSize() * 3}px ${gridSize}px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px -2px rgba(23, 43, 77, 0.32),
      0 0 1px rgba(23, 43, 77, 0.25);
    text-decoration: none;
    color: ${colors.N900};
  }

  animation-delay: ${( index ) =>
    0.5 + 0.03 * (index || 0)}s;
  background-size: contain;
  background-position: bottom;
`;

const InternalCard = styled('a')`
  ${BaseCardStyles};
`;

const ExternalCard = styled('a')`
  ${BaseCardStyles};
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
`;

const Img = (src, alt = '') => (
  <img
    alt={alt}
    style={{
      margin: '0 auto 10px auto',
      height: '200px',
      display: 'block',
    }}
    src={src}
  />
);

// export type CardProps = {
//   icon: React.ComponentType;
//   index?: number;
//   text: string;
//   title: string;
//   image?: string;
//   alt?: string;
//   to: string;
//   href?: string;
// };

class Card extends React.Component {
  render() {
    const { icon: Icon, text, title, image, alt, ...props } = this.props;

    const LinkComponent = props.href ? ExternalCard : InternalCard;

    return (
      <LinkComponent {...props}>
        <div style={{ padding: '16px 24px', marginBottom: 'auto' }}>
          <TitleRow>
            <Icon />
            {title}
          </TitleRow>
          {text ? <p>{text}</p> : null}
        </div>
        {image ? <Img src={image} alt={alt} /> : null}
      </LinkComponent>
    );
  }
}

const cards = [
  {
    href: 'https://github.com/CS-633-Team-8/term_project',
    to: '',
    title: 'Project Repository',
    icon: () => (
      <CardIcon color={colors.Y400}>
        <CodeIcon
          label="Project Repository"
          primaryColor={colors.N0}
          secondaryColor={colors.Y400}
          size="small"
        />
      </CardIcon>
    ),
    text:
      'Want to dive straight into the code? Check out our repo on GitHub.',
  },
  {
    href: 'https://www.pivotaltracker.com/n/projects/2429792',
    to: '',
    title: 'Pivotal Tracker',
    icon: () => (
      <CardIcon color={colors.N0}>
        <DocumentIcon
          label="Tracker"
          primaryColor={colors.P400}
          size="large"
        />
      </CardIcon>
    ),
    text: 'Keep up to date on the latest in our Pivotal Tracker.',
  },
  {
    href: 'https://google.com',
    to: '',
    title: 'Test News Story',
    icon: () => (
      <CardIcon color={colors.N0}>
        <BlogIcon
          label="Test News"
          primaryColor={colors.P400}
          size="medium"
        />
      </CardIcon>
    ),
    text: 'This is a test news story item',
  },
  {
    href: 'https://google.com',
    to: '',
    title: 'Test News Story',
    icon: () => (
      <CardIcon color={colors.N0}>
        <BlogIcon
          label="Test News"
          primaryColor={colors.P400}
          size="medium"
        />
      </CardIcon>
    ),
    text: 'This is a test news story item',
  },
  {
    href: 'https://google.com',
    to: '',
    title: 'Test News Story',
    icon: () => (
      <CardIcon color={colors.N0}>
        <BlogIcon
          label="Test News"
          primaryColor={colors.P400}
          size="medium"
        />
      </CardIcon>
    ),
    text: 'This is a test news story item',
  },
  {
    href: 'https://google.com',
    to: '',
    title: 'Test News Story',
    icon: () => (
      <CardIcon color={colors.N0}>
        <BlogIcon
          label="Test News"
          primaryColor={colors.P400}
          size="medium"
        />
      </CardIcon>
    ),
    text: 'This is a test news story item',
  }
];

/* eslint-disable react/no-multi-comp */
export default class Cards extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
        columnCount: 3,
    };
    this.detectColumns = () => {
        const width = window.innerWidth;
        if (width <= MOBILE_BREAKPOINT_MAX) {
            this.setState({ columnCount: 1 });
        }
        else if (width <= TABLET_BREAKPOINT_MAX) {
            this.setState({ columnCount: 2 });
        }
        else {
            this.setState({ columnCount: 3 });
        }
    };
    this.columnIndexes = () => {
        const { columnCount } = this.state;
        if (columnCount === 1) {
            return [[0, 1, 2, 3, 4, 5]];
        }
        else if (columnCount === 2) {
            return [
                [0, 2],
                [1, 3, 4, 5],
            ];
        }
        return [
            [0, 3],
            [1, 4],
            [2, 5],
        ];
    };
}
componentDidMount() {
    this.debouncedDetect = debounce(this.detectColumns, 500);
    window.addEventListener('resize', this.debouncedDetect);
}
componentWillUnmount() {
    if (this.debouncedDetect) {
        window.removeEventListener('resize', this.debouncedDetect);
    }
}
  render() {
    const columns = this.columnIndexes();

    return (
      <CardsWrapper innerRef={this.detectColumns}>
        {columns.map((cardKeys, colIndex) => (
          /* eslint-disable react/no-array-index-key */
          <CardColumn key={colIndex}>
            {cardKeys.map((cardIndex, index) => {
              const props = cards[cardIndex];
              return <Card index={index} key={props.title} {...props} />;
            })}
          </CardColumn>
        ))}
      </CardsWrapper>
    );
  }
}
