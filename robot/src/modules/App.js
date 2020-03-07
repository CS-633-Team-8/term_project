import React from "react"
import Media from "react-media"
import GlobalTheme from "@atlaskit/theme"
import Page from "@atlaskit/page"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { DESKTOP_BREAKPOINT_MIN } from "../constants"
import { pageRoutes } from "./routes"
import ScrollHandler from "../components/ScrollToTop"
import ErrorBoundary from "../components/ErrorBoundary"
import DesktopNav from "./DesktopNav"
import MobileNav from "./MobileNav"
import Callback from "./Auth/Callback"
import AuthContext from "./Context/auth-context"

import Auth from "./Auth"

export default () => {
  const auth = new Auth()
  return (
    <GlobalTheme.Provider value={() => ({ mode: "light" })}>
      <BrowserRouter>
        <Media query={`(min-width: ${DESKTOP_BREAKPOINT_MIN}px)`}>
          {isDesktop => (
            <div>
              <ScrollHandler />
              <AuthContext.Provider value={auth}>
                <Switch>
                  <Route path="/callback" component={Callback} />
                  <Route
                    render={appRouteDetails => (
                      <Page
                        navigation={
                          isDesktop ? (
                            <DesktopNav {...appRouteDetails} />
                          ) : (
                            false
                          )
                        }
                      >
                        {!isDesktop && (
                          <MobileNav appRouteDetails={appRouteDetails} />
                        )}
                        <ErrorBoundary>
                          <Switch>
                            {pageRoutes.map((routeProps, index) => (
                              <Route {...routeProps} key={index} />
                            ))}
                          </Switch>

                          {/* {modalRoutes.map((modal, index) => (<Route {...modal} key={index}/>))} */}
                        </ErrorBoundary>
                      </Page>
                    )}
                  />
                </Switch>
              </AuthContext.Provider>
            </div>
          )}
        </Media>
      </BrowserRouter>
    </GlobalTheme.Provider>
  )
}
