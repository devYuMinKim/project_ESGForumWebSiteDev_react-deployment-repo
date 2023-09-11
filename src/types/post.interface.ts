export interface PostFile {
  url: string;
}

type Types = 'notification' | 'reference';

export interface Post {
  id: string;
  type: Types;
  title: string;
  content: string;
  author: string;
  view: Number;
  files?: Array<PostFile>;
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
}

export interface SendPost extends Omit<Post, 'id' | 'created_at' | 'updated_at'> {}
