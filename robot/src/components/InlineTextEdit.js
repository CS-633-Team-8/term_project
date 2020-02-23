import React from 'react';
import { InlineEditableTextfield } from '@atlaskit/inline-edit';

const InlineTextEdit = (props) => {
  return (
    // <div
    //     style={{
    //       padding: `${gridSize()}px ${gridSize()}px ${gridSize() * 6}px`,
    //     }}
    //   >
    <InlineEditableTextfield
          defaultValue={props.value}
          onConfirm={value => props.onConfirm(props.index, props.cell, value )}
          placeholder="Click to enter text"
        />
    //</div>
  );
}

export default InlineTextEdit;
