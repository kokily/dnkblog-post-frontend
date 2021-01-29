import React, { useState, useEffect } from 'react';
import marked from 'marked';
import Prism from 'prismjs';
import MarkdownRender from '../../components/common/MarkdownRender';

interface MarkdownRenderProps {
  markdown: string;
}

function MarkdownRenderContainer({ markdown }: MarkdownRenderProps) {
  const [html, setHtml] = useState('');

  const renderMarkdown = () => {
    if (!markdown) {
      setHtml('');
      return;
    }

    setHtml(
      marked(markdown, {
        breaks: true,
      })
    );
  };

  useEffect(() => {
    renderMarkdown();
  });

  useEffect(() => {
    return () => {
      Prism.highlightAll();
    };
  }, [html]);

  return <MarkdownRender html={html} />;
}

export default MarkdownRenderContainer;
