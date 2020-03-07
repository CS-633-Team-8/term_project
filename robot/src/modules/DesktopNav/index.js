import React from "react"
import { Skeleton, presetThemes } from "@atlaskit/navigation"

const SkeletonNav = ({ location }) => {
  const isContainerNavOpen = location ? location.pathname === "/" : true
  return (
    <Skeleton
      isCollapsed={isContainerNavOpen}
      containerTheme={presetThemes.global}
    />
  )
}
const DesktopNav = React.lazy(() => import("./DesktopNav"))
export default props => (
  <React.Suspense fallback={<SkeletonNav {...props} />}>
    <DesktopNav {...props} />
  </React.Suspense>
)
