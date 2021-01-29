import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { TagType } from '../../libs/types';

interface TopTagProps {
  tags: TagType[];
  all_count: number;
  onTag: (name: string) => void;
}

function TopTag({ tags, all_count, onTag }: TopTagProps) {
  return (
    <TopTagBox>
      <h4>
        태그 순위 <small>총 {all_count} 개 태그</small>
      </h4>
      <hr />

      <TagsList>
        {tags &&
          tags.map((tag) => (
            <div key={tag.id}>
              <h4 className="link" onClick={() => onTag(tag.name)}>
                #{tag.name}
              </h4>
              <h4 className="count">{tag.count}개</h4>
            </div>
          ))}
      </TagsList>
    </TopTagBox>
  );
}

export default TopTag;

// Styles
const TopTagBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2rem;
  h4 {
    margin: 0 0 0 0.5rem;
    small {
      margin-left: 1.5rem;
      color: ${oc.teal[5]};
    }
  }
  hr {
    width: 100%;
  }
`;

const TagsList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
  div {
    display: flex;
    height: 2.2rem;
  }
  h4 {
    flex: 1;
  }
  .link {
    cursor: pointer;
    color: ${oc.blue[5]};
    transition: 0.2s all;
    &:hover {
      color: ${oc.blue[3]};
    }
  }
  .count {
    color: ${oc.teal[5]};
  }
`;
