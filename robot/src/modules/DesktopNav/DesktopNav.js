import React from 'react';
import { toClass } from 'recompose';
import Tooltip from '@atlaskit/tooltip';
import SearchIcon from '@atlaskit/icon/glyph/search';
import MenuIcon from '@atlaskit/icon/glyph/menu';
import Navigation, { AkContainerTitle, presetThemes, } from '@atlaskit/navigation';
import Groups from './NewGroups';
import GroupDrawer from './GroupDrawer';
import { Link } from '../../components/WrappedLink';
import HeaderIcon from '../../components/HeaderIcon';
import { CONTAINER_HEADERS_CONFIG } from './constants';
import { HaroldIcon } from '../../components/HaroldIcon';
//import SearchDrawer from './SearchDrawer';
//import { externalPackages as packages, docs, patterns } from '../../site';
export default function Nav({ location }) {
    const [groupDrawerOpen, setGroupDrawerOpen] = React.useState(false);
    const [searchDrawerOpen, setSearchDrawerOpen] = React.useState(false);
    const [searchDrawerValue, setSearchDrawerValue] = React.useState('');
    const isContainerNavOpen = location.pathname !== '/' ;
    const theme = isContainerNavOpen ? null : presetThemes.global;
    const headerKey = location.pathname.split('/').filter(p => p)[0];
    const header = CONTAINER_HEADERS_CONFIG[headerKey];
    const groups = <Groups />;
    return (<Navigation containerTheme={theme} isCollapsible={true} isOpen={false} isResizeable={false} globalCreateIcon={<Tooltip content="Menu" position="right">
          <MenuIcon label="Menu"/>
        </Tooltip>} globalPrimaryItemHref={'/'} globalPrimaryIcon={<Tooltip content="Home" position="right">
          <HaroldIcon />
        </Tooltip>} 
        // globalSearchIcon={<Tooltip content="Search" position="right">
        //   <SearchIcon label="search"/>
        // </Tooltip>} 
        onSearchDrawerOpen={() => setSearchDrawerOpen(true)} onCreateDrawerOpen={() => setGroupDrawerOpen(true)} drawers={[
        <GroupDrawer key="groupDrawer" isOpen={groupDrawerOpen} closeDrawer={() => setGroupDrawerOpen(false)} pathname={location.pathname}>
          "Groups Area"
        </GroupDrawer>,
    ]} containerHeaderComponent={() => isContainerNavOpen &&
        header && (<AkContainerTitle icon={<HeaderIcon {...header}/>} text={header.label} href={`/${headerKey}`} linkComponent={toClass(({ href, children, className, onClick }) => (<Link onClick={onClick} to={href} className={className}>
                  {children}
                </Link>))}/>)}>
      {/* {isContainerNavOpen && groups} */}
      {isContainerNavOpen}
    </Navigation>);
}
