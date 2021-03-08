import React from 'react';
import Link from 'next/link';
import styled, { css } from 'styled-components';
import oc from 'open-color';
import { CgChevronDoubleLeftO, CgChevronDoubleRightO } from 'react-icons/cg';
import { media } from '../../style/media';

interface NearPostProps {
  id: string | null;
  title: string | null;
  category: string | null;
  direction: 'left' | 'right' | null;
}

function NearPost({ id, title, category, direction }: NearPostProps) {
  return (
    <>
      {id ? (
        <Link href={`/post/${id}`} passHref={true}>
          <NearPostBox active={true}>
            {direction === 'left' ? (
              <>
                <ArrowBox>
                  <CgChevronDoubleLeftO size={42} />
                </ArrowBox>

                <ContentBox>
                  <span style={{ marginLeft: '0.5rem' }}>
                    {title.length > 15 ? `${title.slice(15)}...` : title}
                  </span>
                </ContentBox>
              </>
            ) : (
              <>
                <ContentBox>
                  <span>{title.length > 15 ? `${title.slice(15)}...` : title}</span>
                </ContentBox>
                <ArrowBox>
                  <CgChevronDoubleRightO size={42} />
                </ArrowBox>
              </>
            )}
          </NearPostBox>
        </Link>
      ) : (
        <NearPostBox active={false} />
      )}
    </>
  );
}

export default NearPost;

// Styles
const NearPostBox = styled.div<{ active: boolean }>`
  display: flex;
  width: 40%;
  height: 5rem;
  padding: 1rem;
  margin-bottom: 4rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  cursor: pointer;
  transition: 0.2s all;

  ${(props) =>
    props.active &&
    css`
      background: ${oc.teal[6]};

      &:hover {
        background: ${oc.teal[5]};
      }

      &:active {
        transform: translateY(2px);
      }
    `}

  ${(props) =>
    props.active === false &&
    css`
      pointer-events: none;
    `}

    
  ${media.medium} {
    width: 100%;
  }
`;

const ArrowBox = styled.div`
  display: inline-flex;
  flex: 0;
  align-items: center;

  ${media.medium} {
    
  }
`;

const ContentBox = styled.div`
  display: inline-flex;
  flex: 1;
  align-items: center;

  span {
    font-size: 1.5rem;
  }
`;
