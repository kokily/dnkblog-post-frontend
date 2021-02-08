export interface MeType {
  id: string;
  username: string;
  profile: string | null;
  admin: boolean;
  githubId: string | null;
  email: string | null;
}

export interface TagType {
  id: string;
  name: string;
  count: number;
  created_at: string;
}

export interface PostType {
  id: string;
  category: string;
  title: string;
  body: string;
  thumbnail: string | null;
  tags: string[] | null;
  created_at: string;
  updated_at?: string;
  comments: CommentType[];
  replies: ReplyType[];
}

export interface CategoryType {
  name: string;
}

export interface AuthProps {
  email: string;
  username?: string;
  password: string;
  passwordConfirm?: string;
}

export interface AuthAction {
  name: string;
  value: string;
}

export interface CommentType {
  id: string;
  body: string;
  deleted: boolean;
  userId: string;
  username: string;
  profile: string;
  postId: string;
  replies: ReplyType[];
  created_at: string;
  updated_at?: string;
}

export interface ReplyType {
  id: string;
  body: string;
  deleted: boolean;
  userId: string;
  username: string;
  profile: string;
  postId: string;
  commentId: string;
  created_at: string;
  updated_at?: string;
}

export interface CountType {
  comments_num: number;
  replies_num: number;
}

export interface UserCommentType {
  comments: CommentType[];
  replies: ReplyType[];
}
