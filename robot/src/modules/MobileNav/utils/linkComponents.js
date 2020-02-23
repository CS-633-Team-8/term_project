import React from 'react';
import { toClass } from 'recompose';
import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme';
import { AkNavigationItem } from '@atlaskit/navigation';
import renderNav from './renderNav';
import { Link } from '../../../components/WrappedLink';
const SubNavWrapper = styled.div `
  padding: 0 0 0 ${() => gridSize() * 4}px;
`;
export function isSubNavExpanded(to, pathname) {
    const lastSeg = to.split('/').pop();
    return (pathname.startsWith(to) &&
        (!!pathname.match(new RegExp(`\/${lastSeg}\/`)) ||
            !!pathname.match(new RegExp(`\/${lastSeg}$`))));
}
const RouterLink = ({ children, href, replace, className, subNav, onClick, pathname, }) => {
    return (<div key={pathname}>
      <Link className={className} onClick={onClick} replace={replace} style={{ color: 'inherit' }} to={href || ''}>
        {children}
      </Link>
      {subNav && href && (<SubNavWrapper>
          {renderNav(subNav, { pathname, onClick })}
        </SubNavWrapper>)}
    </div>);
};
export const RouterNavigationItem = (props) => {
    return (<AkNavigationItem linkComponent={toClass((linkProps) => (<RouterLink onClick={props.onClick} pathname={props.pathname} subNav={props.subNav} {...linkProps}/>))} {...props}/>);
};
// TODO: Type correct once navigation is typed
export const ExternalNavigationItem = (props) => (<AkNavigationItem {...props}/>);