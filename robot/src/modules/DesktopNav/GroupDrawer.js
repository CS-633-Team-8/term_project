import React from 'react';
import { AkCustomDrawer } from '@atlaskit/navigation';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import DefaultNav from './navigations/Default';
import { HaroldIcon } from '../../components/HaroldIcon';
const GroupDrawer = ({ closeDrawer, isOpen, pathname, }) => (<AkCustomDrawer backIcon={<ArrowLeftIcon label="go back"/>} isOpen={isOpen} key="groups" onBackButton={closeDrawer} primaryIcon={<HaroldIcon />}>    <DefaultNav onClick={closeDrawer} pathname={pathname}/>  </AkCustomDrawer>);
export default GroupDrawer;