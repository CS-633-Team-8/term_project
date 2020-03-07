import React from "react"
import Avatar from "@atlaskit/avatar"
import DropdownMenu, {
  DropdownItemGroup,
  DropdownItem
} from "@atlaskit/dropdown-menu"
import ChevronRightCircleIcon from "@atlaskit/icon/glyph/chevron-right-circle"
import styled from "styled-components"
import { presidents } from "./presidents"
import { lorem } from "./lorem"

function createKey(input) {
  return input ? input.replace(/^(the|a|an)/, "").replace(/\s/g, "") : input
}
function iterateThroughLorem(index) {
  return index > lorem.length ? index - lorem.length : index
}
const NameWrapper = styled.span`
  display: flex;
  align-items: center;
`
const AvatarWrapper = styled.div`
  margin-right: 8px;
`
export const caption = "localhost: 127.0.0.1"
export const createHead = withWidth => {
  return {
    cells: [
      {
        key: "name",
        content: "Name",
        isSortable: true,
        width: withWidth ? 25 : undefined
      },
      {
        key: "type",
        content: "Type",
        shouldTruncate: true,
        isSortable: true,
        width: withWidth ? 15 : undefined
      },
      {
        key: "rows",
        content: "Rows",
        shouldTruncate: true,
        isSortable: true,
        width: withWidth ? 10 : undefined
      },
      {
        key: "size",
        content: "Size",
        shouldTruncate: true
      },
      {
        key: "more",
        shouldTruncate: true
      }
    ]
  }
}
export const head = createHead(true)
export const rows = presidents.map((president, index) => ({
  key: `row-${index}-${president.nm}`,
  cells: [
    {
      key: createKey(president.nm),
      content: React.createElement(
        NameWrapper,
        null,
        <ChevronRightCircleIcon />,
        React.createElement(
          "a",
          { href: "https://atlassian.design" },
          president.nm
        )
      )
    },
    {
      key: createKey(president.pp),
      content: president.pp
    },
    {
      key: president.id,
      content: president.tm
    },
    {
      content: iterateThroughLorem(index)
    },
    {
      content: React.createElement(
        DropdownMenu,
        { trigger: "Actions", triggerType: "button" },
        React.createElement(
          DropdownItemGroup,
          null,
          React.createElement(DropdownItem, null, president.nm)
        )
      )
    }
  ]
}))
