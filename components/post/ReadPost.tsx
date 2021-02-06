import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import oc from 'open-color';
import { PostType } from '../../libs/types';
import shadow from '../../style/shadow';
import { media } from '../../style/media';
import formatDate from '../../libs/formatDate';
import MarkdownRenderContainer from '../../containers/common/MarkdownRenderContainer';

interface ReadPostProps {
  post: PostType | null;
}

function ReadPost({ post }: ReadPostProps) {
  return (
    <>
      <PostBox>
        <Link href={`/category/${post.category}`} passHref={true}>
          <CategoryLink>카테고리 &gt; {post.category}</CategoryLink>
        </Link>

        <PostTitle>
          <h1>{post.title}</h1>
          <p>{formatDate(post.created_at)} 작성</p>

          {post.tags && (
            <PostTagBox>
              {post.tags.map((tag, i) => (
                <div key={i} className="tag">
                  #{tag}
                </div>
              ))}

              <ThumbnailBox>
                <img
                  src={post.thumbnail === '' ? '/thumbnail.png' : post.thumbnail}
                  alt="썸네일"
                />
              </ThumbnailBox>
            </PostTagBox>
          )}

          <HrBar />
        </PostTitle>

        <PostContent>
          <MarkdownRenderContainer markdown={post.body} />
        </PostContent>
      </PostBox>
    </>
  );
}

export default ReadPost;

// Styles
const PostBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 950px;
  border-bottom: 0.5rem outset ${oc.teal[4]};
  margin-bottom: 2.5rem;
`;

const CategoryLink = styled.a`
  cursor: pointer;
  color: ${oc.blue[7]};
  &:hover {
    color: ${oc.blue[8]};
    font-weight: bold;
  }
`;

const PostTitle = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 2.1rem;
  h1 {
    ${media.medium} {
      font-size: 1.5rem;
    }
  }
`;

const PostTagBox = styled.div`
  .tag {
    display: inline-block;
    font-size: 1.3rem;
    font-weight: 600;
    color: ${oc.cyan[7]};
    margin-right: 0.5rem;
    cursor: pointer;
    transition: 0.2s all;
    &:hover {
      color: ${oc.cyan[4]};
    }
    ${media.medium} {
      font-size: 1.1rem;
    }
  }
`;

const ThumbnailBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 1.215rem;
  img {
    width: 100%;
    max-width: 650px;
    height: auto;
    filter: sepia(40%);
    border: 1px solid white;
    border-radius: 4px;
    padding: 5px;
    ${shadow(2)};
  }
`;

const HrBar = styled.div`
  height: 1.8px;
  margin-top: 4.5rem;
  background: linear-gradient(to right, white, ${oc.cyan[4]});
`;

const PostContent = styled.div`
  font-size: 1.2rem;
  margin-bottom: 4rem;
`;
