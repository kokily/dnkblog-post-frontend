import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import MarkdownContainer from '../../containers/common/MarkdownRenderContainer';

interface WritePreviewProps {
  category: string;
  title: string;
  body: string;
  thumbnail: string;
  tags: string[];
}

function WritePreview({ category, title, body, thumbnail, tags }: WritePreviewProps) {
  return (
    <PreviewBox>
      <h4>카테고리: {category}</h4>

      {tags && (
        <ul className="tags">
          태그:
          {tags.map((tag) => (
            <li key={tag} className="tag">
              #{tag}
            </li>
          ))}
        </ul>
      )}

      <hr />

      {thumbnail && (
        <p>
          <img className="thumbnail" src={thumbnail} alt="" />
        </p>
      )}

      <h1 className="title">{title}</h1>
      <div className="content">
        <MarkdownContainer markdown={body} />
      </div>
    </PreviewBox>
  );
}

export default WritePreview;

// Styles
const PreviewBox = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  font-size: 1.2rem;
  color: black;
  .thumbnail {
    max-width: 100%;
    margin: 0 auto;
    display: block;
  }
  .title {
    font-size: 2.4rem;
    font-weight: 600;
    color: ${oc.indigo[8]};
    padding-bottom: 0.4rem;
    border-bottom: 1px solid ${oc.indigo[7]};
  }
  .content {
    line-height: 1.6;
  }
  .tags {
    display: flex;
    flex-direction: row;
    list-style: none;
    padding-left: 0;
    .tag {
      font-weight: 500;
      color: ${oc.blue[5]};
      margin-left: 0.5rem;
    }
  }
`;
