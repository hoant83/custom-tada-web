import { observer } from 'mobx-react';
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './index.scss';

interface ComponentProps {
  defaultValue: string;
  setContent: (string: string) => void;
}

const CustomQuillEditor = (props: ComponentProps) => {
  const { defaultValue, setContent } = props;
  return (
    <>
      <ReactQuill
        theme="snow"
        value={defaultValue}
        onChange={(content, delta, source, editor) => {
          setContent(editor.getHTML() || '');
        }}
      ></ReactQuill>
    </>
  );
};

export default observer(CustomQuillEditor);
