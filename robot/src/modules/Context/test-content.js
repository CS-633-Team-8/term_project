import React from "react"
import styled from "styled-components"
// import { Link } from '../../components/WrappedLink';
import { colors } from "@atlaskit/theme"

import DocumentIcon from "@atlaskit/icon/glyph/document-filled"
import BlogIcon from "@atlaskit/icon/glyph/component"
import CodeIcon from "@atlaskit/icon/glyph/code"

const CardIcon = styled.span`
  align-items: center;
  background-color: ${p => p.color};
  border-radius: 4px;
  border: 2px solid ${colors.N0};
  display: flex;
  height: 24px;
  justify-content: center;
  margin-right: 8px;
  width: 24px;
`

export const testStories = [
  {
    href: "https://github.com/CS-633-Team-8/term_project",
    to: "",
    title: "Project Repository",
    icon: () => (
      <CardIcon color={colors.Y400}>
        <CodeIcon
          label="Project Repository"
          primaryColor={colors.N0}
          secondaryColor={colors.Y400}
          size="small"
        />
      </CardIcon>
    ),
    text: "Want to dive straight into the code? Check out our repo on GitHub."
  },
  {
    href: "https://www.pivotaltracker.com/n/projects/2429792",
    to: "",
    title: "Pivotal Tracker",
    icon: () => (
      <CardIcon color={colors.N0}>
        <DocumentIcon label="Tracker" primaryColor={colors.P400} size="large" />
      </CardIcon>
    ),
    text: "Keep up to date on the latest in our Pivotal Tracker."
  },
  {
    href: "https://google.com",
    to: "",
    title: "Test News Story",
    icon: () => (
      <CardIcon color={colors.N0}>
        <BlogIcon label="Test News" primaryColor={colors.P400} size="medium" />
      </CardIcon>
    ),
    text: "This is a test news story item"
  },
  {
    href: "https://google.com",
    to: "",
    title: "Test News Story",
    icon: () => (
      <CardIcon color={colors.N0}>
        <BlogIcon label="Test News" primaryColor={colors.P400} size="medium" />
      </CardIcon>
    ),
    text: "This is a test news story item"
  },
  {
    href: "https://google.com",
    to: "",
    title: "Test News Story",
    icon: () => (
      <CardIcon color={colors.N0}>
        <BlogIcon label="Test News" primaryColor={colors.P400} size="medium" />
      </CardIcon>
    ),
    text: "This is a test news story item"
  },
  {
    href: "https://google.com",
    to: "",
    title: "Test News Story",
    icon: () => (
      <CardIcon color={colors.N0}>
        <BlogIcon label="Test News" primaryColor={colors.P400} size="medium" />
      </CardIcon>
    ),
    text: "This is a test news story item"
  }
]
