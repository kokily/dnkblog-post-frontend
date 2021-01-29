import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/components/prism-bash.min.js';
import 'prismjs/components/prism-javascript.min.js';
import 'prismjs/components/prism-jsx.min.js';
import 'prismjs/components/prism-css.min.js';

interface MarkdownRenderProps {
  html: string;
}

function MarkdownRender({ html }: MarkdownRenderProps) {
  return <MarkdownBox dangerouslySetInnerHTML={{ __html: html }} />;
}

export default MarkdownRender;

// Styles
const MarkdownBox = styled.div`
  blockquote {
    border-left: 4px solid ${oc.blue[6]};
    padding: 1rem;
    background: ${oc.gray[1]};
    color: black;
    margin-left: 0;
    margin-right: 0;
    p {
      margin: 0;
    }
  }
  h1,
  h2,
  h3,
  h4 {
    font-weight: 500;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  p {
    code {
      background: ${oc.gray[0]};
      padding: 0.25rem;
      color: ${oc.blue[6]};
      border: 1px solid ${oc.gray[2]};
      border-radius: 2px;
    }
  }
  a {
    color: ${oc.blue[6]};
    &:hover {
      color: ${oc.blue[5]};
      text-decoration: underline;
    }
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }
  table,
  th,
  td {
    border: 1px solid ${oc.gray[4]};
  }
  th,
  td {
    font-size: 0.9rem;
    padding: 0.25rem;
    text-align: left;
  }
  img {
    max-width: 100%;
    margin: 0 auto;
    display: block;
    margin-bottom: 2.3rem;
  }
`;
