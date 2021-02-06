import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import MarkdownRenderContainer from '../../containers/common/MarkdownRenderContainer';

interface PreviewProps {
  body: string;
}

function Preview({ body }: PreviewProps) {
  return (
    <PreviewBox>
      <span>- 댓글 미리보기 -</span>
      <MarkdownRenderContainer markdown={body} />
    </PreviewBox>
  );
}

export default Preview;

// Styles
const PreviewBox = styled.div`
  position: absolute;
  width: 100%;
  height: auto;
  bottom: 130px;
  background: rgba(178, 235, 244, 0.8);
  color: black;
  min-height: 5rem;
  border-radius: 7px;
  padding: 0.5rem;

  span {
    font-weight: bold;
    color: ${oc.teal[8]};
  }
`;
