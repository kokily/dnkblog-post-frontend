import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import oc from 'open-color';
import { PostType } from '../../libs/types';
import { media } from '../../style/media';
import formatDate from '../../libs/formatDate';

interface CategoryProps {
  posts: PostType[];
  onTagLink: (tag: string) => void;
}

function CategoryPosts({ posts, onTagLink }: CategoryProps) {
  return (
    <CategoryPostsBox>
      <Link href={'/'} passHref={true}>
        <CategoryLink>인덱스 페이지로 &lt; {posts[0].category}</CategoryLink>
      </Link>

      <>
        {posts === null || posts.length === 0 ? (
          <h3>해당되는 포스트가 없습니다.</h3>
        ) : (
          <>
            {posts.map((post) => (
              <PostBox key={post.id}>
                <img src={post.thumbnail ? post.thumbnail : '/thumbnail.png'} alt="" />
                <div>
                  <h1>
                    <Link href={`/post/${post.id}`} passHref={true}>
                      {post.title.length > 20
                        ? `${post.title.slice(0, 20)}...`
                        : post.title}
                    </Link>
                  </h1>
                  <span>{formatDate(post.created_at)} 작성</span>
                  <p>
                    {post.tags && (
                      <>
                        {post.tags.map((tag) => (
                          <b key={tag} onClick={() => onTagLink(tag)}>
                            #{tag}
                          </b>
                        ))}
                      </>
                    )}
                  </p>
                </div>
              </PostBox>
            ))}
          </>
        )}
      </>
    </CategoryPostsBox>
  );
}

export default CategoryPosts;

// Styles
const CategoryPostsBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 1200px;
  max-width: 760px;
  margin: 0 auto;
  ${media.small} {
    width: 100%;
    margin: 0 auto;
  }
`;

const CategoryLink = styled.a`
  cursor: pointer;
  color: ${oc.blue[7]};
  margin-bottom: 1rem;
  &:hover {
    color: ${oc.blue[8]};
    font-weight: bold;
  }
`;

const PostBox = styled.div`
  display: flex;
  align-items: flex-start;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid white;
  img {
    margin-right: 15px;
    width: 15rem;
  }
  h1 {
    color: ${oc.cyan[5]};
    margin: 0;
    margin-top: 0.6rem;
    padding: 0;
    line-height: 2rem;
    cursor: pointer;
    transition: 0.2s all;
    &:hover {
      color: ${oc.cyan[4]};
    }
  }
  span {
    display: block;
    margin-top: 1.2rem;
    margin-left: 0.5rem;
    font-size: 1rem;
    color: ${oc.gray[4]};
  }
  p {
    margin-top: 2rem;
    transition: 0.14s all;
    b {
      font-size: 1.2rem;
      margin-right: 0.6rem;
      color: ${oc.blue[8]};
      cursor: pointer;
      &:hover {
        color: ${oc.blue[5]};
      }
    }
  }
  ${media.medium} {
    flex-direction: column;
    img {
      width: 100%;
    }
  }
`;

const CloseButton = styled.button`
  width: fit-content;
  height: 42px;
  font-size: 1.3rem;
  font-weight: bold;
  padding-left: 1.2rem;
  padding-right: 0.9rem;
  margin-bottom: 1.4rem;
  border: 2px solid ${oc.blue[7]};
  border-radius: 20px;
  outline: none;
  background: black;
  color: ${oc.blue[7]};
  transition: 0.2s all;
  cursor: pointer;
  &:hover {
    background: ${oc.blue[7]};
    color: white;
  }
  &:active {
    transform: translateY(2px);
  }
`;
