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
}

export interface CategoryType {
  name: string;
}
