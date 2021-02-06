import React, { useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';

let CodeMirror = null;

if (typeof window !== 'undefined') {
  CodeMirror = require('codemirror');
  require('codemirror/mode/markdown/markdown');
  require('codemirror/mode/javascript/javascript');
  require('codemirror/mode/jsx/jsx');
  require('codemirror/mode/css/css');
  require('codemirror/mode/shell/shell');
}

interface WriteBodyProps {
  category: string;
  title: string;
  body: string;
  onChangeCategory: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeBody: React.Dispatch<React.SetStateAction<string>>;
  children: React.ReactNode;
}

function WriteBody({
  category,
  title,
  body,
  onChangeCategory,
  onChangeTitle,
  onChangeBody,
  children,
}: WriteBodyProps) {
  const editor = useRef(null);
  const textPane = useRef(null);
  const options = {
    mode: 'markdown',
    theme: 'monokai',
    lineNumbers: true,
    lineWrapping: true,
  };

  useLayoutEffect(() => {
    textPane.current = CodeMirror(editor.current, options);
    textPane.current.on('change', (doc, change) => {
      if (change.origin !== 'setValue') {
        onChangeBody(doc.getValue());
      }
    });
    textPane.current.setValue(body || '');
  }, []);

  useLayoutEffect(() => {
    if (body !== textPane.current.getValue()) {
      textPane.current.setValue(body);
    }
  }, [body]);

  return (
    <EditorBox>
      <input
        type="text"
        className="category"
        name="category"
        value={category}
        onChange={onChangeCategory}
        placeholder="카테고리 입력"
      />
      <input
        type="text"
        className="title"
        name="title"
        value={title}
        onChange={onChangeTitle}
        placeholder="제목 입력"
      />

      <div className="code-editor" ref={editor} />
      {children}
    </EditorBox>
  );
}

export default WriteBody;

// Styles
const EditorBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  .category,
  .title {
    background: ${oc.gray[7]};
    border: none;
    outline: none;
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
    padding: 0.5rem;
    border-bottom: 0.2px solid ${oc.gray[6]};
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }
  .code-editor {
    flex: 1;
    background: ${oc.gray[9]};
    display: flex;
    flex-direction: column;

    .CodeMirror {
      font-size: 1.25rem;
      flex: 1;
      line-height: 1.5;

      pre {
        max-width: calc(100vw - 50%);
        word-break: break-all;
      }
    }
  }
`;
