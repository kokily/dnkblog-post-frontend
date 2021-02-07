import React from 'react';
import styled from 'styled-components';
import { MeType, TagType } from '../../libs/types';
import { media } from '../../style/media';
import TopTag from '../posts/TopTag';
import Header from './Header';

interface PageTemplateProps {
  me: MeType | null;
  tags: TagType[] | null;
  all_count: number;
  onLogout: () => void;
  onWrite: () => void;
  onTag: (name: string) => void;
  isTag: boolean;
  children: React.ReactNode;
}

function PageTemplate({
  me,
  tags,
  all_count,
  onLogout,
  onWrite,
  onTag,
  isTag,
  children,
}: PageTemplateProps) {
  return (
    <PageBox>
      <Layout>
        <Header user={me} onLogout={onLogout} onWrite={onWrite} />

        <Main>{children}</Main>

        {isTag && (
          <Tag>
            <TopTag tags={tags} all_count={all_count} onTag={onTag} />
          </Tag>
        )}
      </Layout>
    </PageBox>
  );
}

export default PageTemplate;

// Styles
const PageBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 1200px;
  margin-top: 5rem;
  ${media.medium} {
    width: 100%;
    margin-left: 1rem;
    margin-right: 1rem;
  }
`;

const Main = styled.main`
  margin-bottom: 45rem;
  margin-left: 2rem;
  margin-right: 4rem;
  ${media.medium} {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
`;

const Tag = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-basis: 250px;
  flex-shrink: 0;
  ${media.medium} {
    display: none;
  }
`;
