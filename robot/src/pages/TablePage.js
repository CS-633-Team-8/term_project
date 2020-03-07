import React, { Component } from "react"
import DynamicTable from "@atlaskit/dynamic-table"
import MainSection from "../components/MainSection"
// import ContentWrapper from '../components/ContentWrapper';
import FullContentWrapper from "../components/FullContentWrapper"
import PageTitle from "../components/PageTitle"
import { caption, head, rows } from "../content/sample-data"

import { API_PATH } from "../constants"

let apiPath = API_PATH

if (process.env.NODE_ENV !== "production") {
  apiPath = "http://localhost:5000/chat"
}
export default class TablePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    }
  }

  componentDidMount() {
    fetch(apiPath, {
      method: "GET",
      headers: { "Content-Type": "application/json", secretID: "ilovecs633" }
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result
          })
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  }

  render() {
    return (
      <FullContentWrapper>
        <PageTitle>Test Database 1</PageTitle>
        <MainSection />
        <DynamicTable
          caption={caption}
          head={head}
          rows={rows}
          rowsPerPage={10}
          defaultPage={1}
          loadingSpinnerSize="large"
          isLoading={false}
          // isFixedSize
          defaultSortKey="term"
          defaultSortOrder="ASC"
          onSort={() => console.log("onSort")}
          onSetPage={() => console.log("onSetPage")}
        />
      </FullContentWrapper>
    )
  }
}
