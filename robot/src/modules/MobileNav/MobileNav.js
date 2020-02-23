import React from 'react';
import Tooltip from '@atlaskit/tooltip';
import MobileHeader from '@atlaskit/mobile-header';
import Navigation, { AkContainerTitle } from '@atlaskit/navigation';
//import Groups from './Groups';
import { HaroldIcon } from '../../components/HaroldIcon';
//import { externalPackages as packages, docs, patterns } from '../../site';
export function Nav({ closeNav, }) {
    //const groups = (<Groups onClick={closeNav} docs={docs} packages={packages} patterns={patterns}/>);
    return (<Navigation isResizeable={false} globalPrimaryItemHref={'/'} globalPrimaryIcon={<Tooltip content="Home" position="right">
          <HaroldIcon />
        </Tooltip>} containerHeaderComponent={() => (<AkContainerTitle icon={<HaroldIcon monochrome/>} text={'Harold the Chatbot'} href={'/'}/>)}>
      {/* {groups} */}
      "Groups Area"
    </Navigation>);
}
export default function MobileNav({ props }) {
    const [drawerState, setDrawerState] = React.useState('none');
    return (<MobileHeader navigation={(isOpen) => isOpen && <Nav closeNav={() => setDrawerState('none')} {...props}/>} menuIconLabel="Open navigation" drawerState={drawerState} onNavigationOpen={() => setDrawerState('navigation')} onDrawerClose={() => setDrawerState('none')}/>);
}