import React from "react";
import { Redirect } from "react-router-dom";
import * as fs from "../utils/fs";
import Page from "../components/Page";
import FourOhFour from "./FourOhFour";
import { ReactMarkdown } from "react-markdown";
import doc from '../docs/getting-started.md'
export default function Document({
  match: {
    params: { docId }
  }
}) {
  if (!docId) {
    //const found = fs.getFiles(docs.children)[0];
    const found = { id: "getting-started" };
    if (!found) return <FourOhFour />;
    return <Redirect to={`/docs/${fs.normalize(found.id)}`} />;
  }
  //const filePath = `docs/${docId}`;
  //const found = fs.findNormalized(docs, filePath);
  // const Content = Loadable({
  //   loader: async () => {
  //     console.log(`../docs/${docId}.md`);
  //     console.log(doc.text())
  //     import(`../docs/${docId}.md`);
  //   },
  //   loading: () => <Loading />,
  //   render(loaded, props) {
  //     console.log("run");
  //     return <ReactMarkdown source={loaded.text()} />;
  //     // const docDetails = md.default || {};
  //     // const { content, data = {} } = docDetails;
  //     // if (md) {
  //     //   console.log("run");
  //     //   //return <Markdown >{md}</Markdown>;
  //     //   return <ReactMarkdown source={md} />;
  //     // }
  //     // return <FourOhFour />;
  //   }
  // });
  const Content = <ReactMarkdown source={doc} />;
  return (
    <Page>
      <Content />
    </Page>
  );
}
