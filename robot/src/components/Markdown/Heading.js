import React from "react"
import reactAddonsTextContent from "react-addons-text-content"
import { Helmet } from "react-helmet"
import { snakeCase } from "snake-case"

const BASE_TITLE = ""

function dashcase(children) {
  return snakeCase(reactAddonsTextContent(children)).replace(/_/g, "-")
}
export default class Heading extends React.Component {
  constructor() {
    super(...arguments)
    this.state = {
      shouldShowAnchor: false
    }
    this.handleShowAnchor = () => {
      this.setState({ shouldShowAnchor: true })
    }
    this.handleHideAnchor = () => {
      this.setState({ shouldShowAnchor: false })
    }
  }

  render() {
    const { handleHideAnchor, handleShowAnchor } = this
    const { children, level } = this.props
    const { shouldShowAnchor } = this.state
    const id = dashcase(children)
    // H1 on the documentation specifies the main page title
    // We should implement this using gray-matter to have meta data *title* in markdown
    // Currently gray-matter breaks in IE11, please see https://github.com/jonschlinkert/gray-matter/pull/76 for reference
    // Typescript ^3.3 does not support dynamic tag names without using createElement.
    // It may be worth re-working this approach if it not supported by TS
    return React.createElement(
      `h${level}`,
      {
        id,
        onMouseEnter: handleShowAnchor,
        onMouseLeave: handleHideAnchor
      },
      <>
        {level === 1 ? (
          <Helmet>
            <title>
              {`${reactAddonsTextContent(children)} - ${BASE_TITLE}`}
            </title>
          </Helmet>
        ) : (
          ""
        )}

        {children}
        {shouldShowAnchor ? " " : ""}
        {shouldShowAnchor ? <a href={`#${id}`}>#</a> : ""}
      </>
    )
  }
}
