import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import oc from 'open-color';
import { media } from '../../style/media';
import { useProviderTocState } from './ProviderToc';

interface HeaderProps {
  id: string;
  top: number;
}

function PostToc() {
  const { toc } = useProviderTocState();
  const [active, setActive] = useState<string | null>(null);
  const [headerTop, setHeaderTop] = useState<HeaderProps[] | null>(null);

  const getScrollTop = () => {
    const scrollTop = document.documentElement
      ? document.documentElement.scrollTop || document.body.scrollTop
      : document.body.scrollTop;

    return scrollTop;
  };

  const updateScroll = useCallback(() => {
    if (!toc) return;

    const scrollTop = getScrollTop();
    const headerTops = toc.map(({ id }) => {
      const el = document.getElementById(id);

      if (!el) {
        return {
          id,
          top: 0,
        };
      }

      const top = el.getBoundingClientRect().top + scrollTop;

      return {
        id,
        top,
      };
    });

    setHeaderTop(headerTops);
  }, [toc]);

  useEffect(() => {
    updateScroll();
  }, [updateScroll]);

  const onScroll = useCallback(() => {
    const scrollTop = getScrollTop();

    if (!headerTop) return;

    const header = [...headerTop].reverse().find((headingTops) => {
      return scrollTop >= headingTops.top - 16;
    });

    if (!header) {
      setActive(null);
      return;
    }

    setActive(header.id);
  }, [headerTop]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  useEffect(() => {
    onScroll();
  }, [onScroll]);

  if (!toc || !headerTop) return null;

  return (
    <PostTocBox>
      {toc &&
        toc.map((item) => (
          <TocItem
            key={item.id}
            active={active === item.id}
            style={{ marginLeft: item.level * 16 }}
          >
            <a href={`#${item.id}`}>{item.text}</a>
          </TocItem>
        ))}
    </PostTocBox>
  );
}

export default PostToc;

// Styles
const PostTocBox = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 10%;
  right: 10rem;
  border-left: 2px solid ${oc.teal[4]};
  padding-left: 1rem;

  ${media.xxlarge} {
    right: 5rem;
  }

  ${media.xlarge} {
    display: none;
  }
`;

const TocItem = styled.div<{ active: boolean }>`
  font-size: 1rem;
  line-height: 2.2;
  transition: 0.2s all;

  a {
    &:hover {
      color: ${oc.teal[5]};
    }

    ${(props) =>
      props.active &&
      css`
        color: ${oc.teal[4]};
      `}
  }
`;
