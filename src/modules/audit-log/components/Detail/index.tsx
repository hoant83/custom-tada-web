import ReactJson from 'react-json-view';
import React from 'react';

interface ComponentProps {
  content: Object;
}

const component = (props: ComponentProps) => {
  const { content } = props;

  return (
    <ReactJson src={content || {}} name={false} displayDataTypes={false} />
  );
};

export const JsonViewer = component;
