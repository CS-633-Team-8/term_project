import React from 'react';
import { Helmet } from 'react-helmet';
import * as CommonMark from 'commonmark';
import * as ReactRenderer from 'commonmark-react-renderer';
import { AkCodeBlock, AkCode } from '@atlaskit/code';
import Heading from './Markdown/Heading';

const DEFAULT_META_DESCRIPTION = ""

const parser = new CommonMark.Parser();
const markdown = 'markdown';
const renderer = new ReactRenderer({
    renderers: {
        CodeBlock: (props) => (<p>
        <AkCodeBlock text={props.literal} language={props.language || markdown}/>
      </p>),
        Code: (props) => (<AkCode text={props.literal} language={props.language || markdown}/>),
        Heading,
    },
});
export default function Markdown({ children, description, }) {
    return (<div>
      <Helmet>
        <meta name="description" 
    // DEFAULT_META_DESCRIPTION is set by webpack config.
    content={description || DEFAULT_META_DESCRIPTION}/>
      </Helmet>
      {renderer.render(parser.parse(children))}
    </div>);
}