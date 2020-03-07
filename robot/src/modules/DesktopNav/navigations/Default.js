import React from "react"
import HomeIcon from "@atlaskit/icon/glyph/home"
import ComponentIcon from "@atlaskit/icon/glyph/component"
// import { BitbucketIcon } from '@atlaskit/logo';
import DashboardIcon from "@atlaskit/icon/glyph/dashboard"
import renderNav from "../utils/renderNav"

const defaultNavGroups = [
  {
    items: [
      {
        to: "/",
        title: "Harold the ChatBot",
        icon: <HomeIcon label="Welcome icon" />
      }
    ]
  },
  {
    title: "Administrator",
    items: [
      {
        to: "/faqs",
        title: "Edit Bot FAQs",
        icon: <ComponentIcon label="Packages icon" />
      }
    ]
  },
  {
    title: "Resources",
    items: [
      {
        to: "https://github.com/CS-633-Team-8/term_project",
        title: "Repository",
        icon: <DashboardIcon label="Design guidelines icon" />,
        external: true
      },
      {
        to: "https://www.pivotaltracker.com/n/projects/2429792",
        title: "Pivotal Tracker Project",
        icon: <DashboardIcon label="Design guidelines icon" />,
        external: true
      }
    ]
  }
]
export default function DefaultNav({ pathname, onClick }) {
  return <div>{renderNav(defaultNavGroups, { pathname, onClick })}</div>
}
