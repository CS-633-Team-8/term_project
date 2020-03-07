import React from "react"
import PropTypes from "prop-types"
import { matchPath } from "react-router-dom"
import ArrowLeftIcon from "@atlaskit/icon/glyph/arrow-left"
import ComponentIcon from "@atlaskit/icon/glyph/component"
import OverviewIcon from "@atlaskit/icon/glyph/overview"
import ChevronRightIcon from "@atlaskit/icon/glyph/chevron-right"
import Button from "@atlaskit/button"
import {
  AkContainerNavigationNested as NestedNav,
  AkNavigationItem
} from "@atlaskit/navigation"
import docsNav from "./navigations/Docs"
import packagesNav from "./navigations/Packages"

export default class Groups extends React.Component {
  constructor() {
    super(...arguments)
    this.state = {
      parentRoute: null,
      stack: [
        [
          <AkNavigationItem
            text="Documentation"
            icon={<OverviewIcon label="Documentation" />}
            action={
              <Button
                appearance="subtle"
                iconBefore={
                  <ChevronRightIcon label="documentation" size="medium" />
                }
                spacing="none"
              />
            }
            onClick={() => this.createDocumentationStack()}
            key="Documentation"
          />,
          <AkNavigationItem
            text="Packages"
            icon={<ComponentIcon label="Packages icon" />}
            action={
              <Button
                appearance="subtle"
                iconBefore={<ChevronRightIcon label="packages" size="medium" />}
                spacing="none"
              />
            }
            onClick={() => this.createPackagesStack()}
            key="Packages"
          />
        ]
      ]
    }
    this.popStack = () => {
      this.setState({
        stack: [...this.state.stack.slice(0, -1)]
      })
    }
    this.createDocumentationStack = () => {
      this.setState({
        stack: [
          ...this.state.stack,
          [
            <AkNavigationItem
              text="Back"
              icon={<ArrowLeftIcon label="Back" />}
              onClick={() => this.popStack()}
              key="back"
            />,
            ...docsNav({
              pathname: this.context.router.route.location.pathname,
              docs: this.props.docs,
              onClick: () => this.props.onClick()
            })
          ]
        ]
      })
    }
    this.createPackagesStack = () => {
      this.setState({
        stack: [
          ...this.state.stack,
          [
            <AkNavigationItem
              text="Back"
              icon={<ArrowLeftIcon label="Add-ons icon" />}
              onClick={() => this.popStack()}
              key="back"
            />,
            ...packagesNav({
              pathname: this.context.router.route.location.pathname,
              packages: this.props.packages,
              onClick: () => this.props.onClick()
            })
          ]
        ]
      })
    }
    this.resolveRoutes = pathname => {
      if (matchPath(pathname, "/docs")) {
        this.createDocumentationStack()
      } else if (matchPath(pathname, "/packages")) {
        this.createPackagesStack()
      }
    }
    this.addItemsToStack = items => {
      this.setState({
        stack: [...this.state.stack, [...items]]
      })
    }
  }

  UNSAFE_componentWillMount() {
    // buildNavForPath(this.context.router.route.location.pathname);
    this.resolveRoutes(this.context.router.route.location.pathname)
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    this.resolveRoutes(nextContext.router.route.location.pathname)
  }

  render() {
    const { stack } = this.state
    return <NestedNav stack={stack} />
  }
}
Groups.contextTypes = {
  router: PropTypes.object
}
