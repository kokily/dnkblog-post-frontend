import { gql } from '@apollo/client';

// All Posts Params(cursor, title)
export const ALL_POSTS = gql`
  query AllPosts($cursor: ID, $title: String) {
    AllPosts(cursor: $cursor, title: $title) {
      ok
      error
      posts {
        id
        category
        title
        body
        thumbnail
        tags
        created_at
        updated_at
        comments {
          id
        }
        replies {
          id
        }
      }
    }
  }
`;

// Tag Posts Params(tag)
export const TAG_POSTS = gql`
  query TagPosts($cursor: ID, $tag: String!) {
    TagPosts(cursor: $cursor, tag: $tag) {
      ok
      error
      posts {
        id
        category
        title
        body
        thumbnail
        tags
        created_at
        updated_at
      }
    }
  }
`;

// Category Posts Params(cursor, category)
export const CATEGORY_POSTS = gql`
  query CategoryPosts($cursor: ID, $category: String!) {
    CategoryPosts(cursor: $cursor, category: $category) {
      ok
      error
      posts {
        id
        category
        title
        body
        thumbnail
        tags
        created_at
        updated_at
      }
    }
  }
`;

// Read Post Params(id)
export const READ_POST = gql`
  query ReadPost($id: ID!) {
    ReadPost(id: $id) {
      ok
      error
      post {
        id
        category
        title
        body
        thumbnail
        tags
        created_at
        updated_at
      }
      prev {
        id
        title
      }
      next {
        id
        title
      }
    }
  }
`;

// Remove Post (Params: id)
export const REMOVE_POST = gql`
  mutation RemovePost($id: ID!) {
    RemovePost(id: $id) {
      ok
      error
    }
  }
`;

// Add Post Params(category, title, body, thumbnail, tags)
export const ADD_POST = gql`
  mutation AddPost(
    $category: String!
    $title: String!
    $body: String!
    $thumbnail: String!
    $tags: [String]!
  ) {
    AddPost(
      category: $category
      title: $title
      body: $body
      thumbnail: $thumbnail
      tags: $tags
    ) {
      ok
      error
      post {
        id
      }
    }
  }
`;

// Update Post Params(id, category, title, body, thumbnail, tags)
export const UPDATE_POST = gql`
  mutation UpdatePost(
    $id: ID!
    $category: String
    $title: String
    $body: String
    $thumbnail: String
    $tags: [String]
  ) {
    UpdatePost(
      id: $id
      category: $category
      title: $title
      body: $body
      thumbnail: $thumbnail
      tags: $tags
    ) {
      ok
      error
    }
  }
`;

// Count Posts Params(cursor)
export const COUNT_POSTS = gql`
  query CountPosts($cursor: ID) {
    CountPosts(cursor: $cursor) {
      ok
      error
      posts {
        id
        title
        counter
      }
    }
  }
`;
