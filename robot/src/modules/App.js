import React from 'react';
import Media from 'react-media';
import GlobalTheme from '@atlaskit/theme';
import Page from '@atlaskit/page';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import { DESKTOP_BREAKPOINT_MIN } from '../constants';
//import { modalRoutes, pageRoutes } from './routes';
import { pageRoutes } from './routes';
import ScrollHandler from '../components/ScrollToTop';
import ErrorBoundary from '../components/ErrorBoundary';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import { IdentityContextProvider } from 'react-netlify-identity';
import CatchNetlifyRecoveryNullComponent from '../components/CatchNetlify';

export default () => {
    return (<GlobalTheme.Provider value={() => ({ mode: 'light' })}>
      <IdentityContextProvider url={"https://askharold.netlify.com"}>
        <CatchNetlifyRecoveryNullComponent />
      <BrowserRouter>
        <Media query={`(min-width: ${DESKTOP_BREAKPOINT_MIN}px)`}>
          {(isDesktop) => (
            <div>
              <ScrollHandler />
              <Switch>
                {/* <Route path="/" component={HomePage}/> */}
                <Route render={appRouteDetails => (<Page navigation={isDesktop ? <DesktopNav {...appRouteDetails}/> : false}>
                      {!isDesktop && (<MobileNav appRouteDetails={appRouteDetails}/>)}
                      <ErrorBoundary>
                        <Switch>
                          {pageRoutes.map((routeProps, index) => (<Route {...routeProps} key={index}/>))}
                        </Switch>

                        {/* {modalRoutes.map((modal, index) => (<Route {...modal} key={index}/>))} */}
                      </ErrorBoundary>
                    </Page>)}/>
              </Switch>
            </div>)}
        </Media>
      </BrowserRouter>
      </IdentityContextProvider>
    </GlobalTheme.Provider>);
};

