import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import oc from 'open-color';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { media } from '../../style/media';
import { PostType } from '../../libs/types';
import formatDate from '../../libs/formatDate';
import Search from '../common/Search';

interface AllPostsProps {
  posts: PostType[];
  title: string;
  search: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: React.MouseEvent) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClose: () => void;
  onTagLink: (tag: string) => void;
}

function AllPosts({
  posts,
  title,
  search,
  onChange,
  onSearch,
  onKeyPress,
  onClose,
  onTagLink,
}: AllPostsProps) {
  return (
    <AllPostsBox>
      {title === '' ? (
        <Search
          mode="제 목"
          search={search}
          onChange={onChange}
          onSearch={onSearch}
          onKeyPress={onKeyPress}
        />
      ) : (
        <CloseButton onClick={onClose}>
          {title} <AiOutlineCloseCircle size={16} color="red" />
        </CloseButton>
      )}
      {posts === null || posts.length === 0 ? (
        <h3>작성된 포스트가 없습니다.</h3>
      ) : (
        <>
          {posts.map((post) => (
            <PostBox key={post.id}>
              <img src={post.thumbnail ? post.thumbnail : '/thumbnail.png'} alt="" />
              <div>
                <Link href={`/post/${post.id}`} passHref={true}>
                  <h1>
                    {post.title.length > 20
                      ? `${post.title.slice(0, 20)}...`
                      : post.title}
                  </h1>
                </Link>

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
    </AllPostsBox>
  );
}

export default AllPosts;

// Styles
const AllPostsBox = styled.div`
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

const PostBox = styled.div`
  display: flex;
  align-items: flex-start;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid white;
  img {
    margin-right: 15px;
    width: 15rem;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  h1 {
    color: ${oc.teal[7]};
    margin: 0;
    margin-top: 0.6rem;
    padding: 0;
    line-height: 2rem;
    cursor: pointer;
    transition: 0.2s all;
    &:hover {
      color: ${oc.teal[2]};
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
    h1 {
      font-size: 1.8rem;
    }
    img {
      width: 100%;
    }
  }
  ${media.small} {
    h1 {
      font-size: 1.5rem;
    }
  }
`;

const CloseButton = styled.button`
  width: fit-content;
  height: 42px;
  font-size: 1.3rem;
  padding-left: 1.2rem;
  padding-right: 0.9rem;
  margin-bottom: 1.4rem;
  border: 2px solid ${oc.red[9]};
  border-radius: 20px;
  outline: none;
  background: black;
  color: white;
  transition: 0.2s all;
  cursor: pointer;
  &:hover {
    background: ${oc.red[9]};
    color: white;
  }
  &:active {
    transform: translateY(2px);
  }
`;


