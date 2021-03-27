import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { PostType } from '../../libs/types';

interface CounterProps {
  posts: PostType[];
  onReadPost: (id: string) => void;
}

function Counter({ posts, onReadPost }: CounterProps) {
  return (
    <CouterBox>
      <h1>Counter test</h1>

      {posts && (
        <Table>
          <thead>
            <th>제목</th>
            <th>조회수</th>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.counter}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </CouterBox>
  );
}

export default Counter;

// Styles
const CouterBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    color: ${oc.indigo[5]};
  }
`;

const Table = styled.table`
  margin: 1rem 0;
  min-width: 300px;

  tr {
    border-top: 1px solid white;
    border-bottom: 1px solid white;
  }

  th {
    display: none;
  }
  td {
    display: block;
  }
  td:first-child {
    padding-top: 0.5em;
  }
  td:last-child {
    padding-bottom: 0.5rem;
  }
  td:before {
    content: ': ';
    font-weight: bold;
    width: 6.5rem;
    display: inline-block;
  }

  @media (min-width: 480px) {
    td:before {
      display: none;
    }
  }

  th,
  td {
    text-align: left;
  }

  @media (min-width: 480px) {
    th,
    td {
      display: table-cell;
      padding: 0.25rem 0.5rem;
    }
    th:first-child,
    td:first-child {
      padding-left: 0;
    }
    th:last-child,
    td:last-child {
      padding-right: 0;
    }

    background: ${oc.indigo[5]};
    border-radius: 0.4rem;
    overflow: hidden;

    tr {
      border-color: ${oc.indigo[3]};
    }
    th,
    td {
      margin: 0.5rem 1rem;
    }

    @media (min-width: 480px) {
      th,
      td {
        padding: 1rem !important;
      }
    }
    th,
    td:before {
      color: ${oc.yellow[3]};
    }
  }
`;
