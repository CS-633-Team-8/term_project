import React from "react"
import Loadable from "react-loadable"

class Wrapper extends React.Component {
  componentDidMount() {}

  render() {
    return this.props.children
  }
}
const WrappedLoadable = ({ render, ...rest }) =>
  Loadable({
    ...rest,
    render: (loaded, props) => <Wrapper>{render(loaded, props)}</Wrapper>
  })
export default WrappedLoadable
