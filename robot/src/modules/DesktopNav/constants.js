import * as colors from "@atlaskit/theme/colors"
import PackagesIcon from "@atlaskit/icon/glyph/component"
import DocumentationIcon from "@atlaskit/icon/glyph/overview"
import PatternsIcon from "@atlaskit/icon/glyph/issues"

export const CONTAINER_HEADERS_CONFIG = {
  docs: {
    icon: DocumentationIcon,
    color: colors.P300,
    label: "Documentation"
  },
  packages: {
    icon: PackagesIcon,
    color: colors.R300,
    label: "Packages"
  },
  patterns: {
    icon: PatternsIcon,
    color: colors.G300,
    label: "Patterns"
  }
}
