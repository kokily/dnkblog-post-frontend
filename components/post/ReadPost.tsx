import React, { useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import oc from 'open-color';
import { PostType } from '../../libs/types';
import shadow from '../../style/shadow';
import { media } from '../../style/media';
import formatDate from '../../libs/formatDate';
import MarkdownRenderContainer from '../../containers/common/MarkdownRenderContainer';
import PostTocContainer from '../../containers/post/PostTocContainer';
import ProviderToc from './ProviderToc';
import NearPost from './NearPost';

interface ReadPostProps {
  post: PostType | null;
  prev: PostType | null;
  next: PostType | null;
}

function ReadPost({ post, prev, next }: ReadPostProps) {
  return (
    <ProviderToc>
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

        <NearPostsBox>
          {prev ? (
            <NearPost
              id={prev.id}
              title={prev.title}
              category={post.category}
              direction={'left'}
            />
          ) : (
            <NearPost id={null} title={null} category={post.category} direction={null} />
          )}
          {next ? (
            <NearPost
              id={next.id}
              title={next.title}
              category={post.category}
              direction={'right'}
            />
          ) : (
            <NearPost id={null} title={null} category={post.category} direction={null} />
          )}
        </NearPostsBox>
      </PostBox>

      <PostTocContainer body={post.body} />
    </ProviderToc>
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
  margin-bottom: 10rem;

  ${media.medium} {
    margin-bottom: 1.5rem;
  }
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
    font-size: 3rem;
    color: ${oc.indigo[5]};

    ${media.medium} {
      font-size: 2.5rem;
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
  margin-top: 5rem;
  margin-bottom: 5rem;
  background: linear-gradient(to right, white, ${oc.cyan[4]});

  ${media.medium} {
    margin-top: 0rem;
    margin-bottom: 1rem;
  }
`;

const PostContent = styled.div`
  font-size: 1.2rem;
  margin-bottom: 17rem;

  ${media.medium} {
    margin-bottom: 0;
  }
`;

const NearPostsBox = styled.div`
  margin-bottom: 6rem;
  display: flex;
  justify-content: space-between;

  ${media.medium} {
    margin-bottom: 1rem;
    display: block;
  }
`;
