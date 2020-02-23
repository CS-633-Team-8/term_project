import React from 'react';
import MobileHeader from '@atlaskit/mobile-header';
const MobileNav = React.lazy(() => import('./MobileNav'));
export default (props) => (<React.Suspense fallback={<MobileHeader />}>
    <MobileNav {...props}/>
  </React.Suspense>);