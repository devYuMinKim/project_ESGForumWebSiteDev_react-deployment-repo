import axios from "axios";
import { PaginatedResponse, Post, SendPost } from "../types/post.interface";

const API_URL = process.env.REACT_APP_API_URL;

/**
 * /posts
 * Get all posts
 * @returns Post[]
 */
export async function getAllPosts(): Promise<PaginatedResponse<Post>> {
  const res = await axios.get<PaginatedResponse<Post>>(`${API_URL}/post`);
  return res.data;
}

export async function getPosts(
  page: number,
  subject?: string,
  host?: string
): Promise<PaginatedResponse<Post>> {
  const res = await axios.get<PaginatedResponse<Post>>(
    `${API_URL}/post?page=${page}`
  );
  return res.data;
}

/**
 * /post/:id
 * Get post by id
 * @param id
 * @returns Post
 */
export async function getPostById(id: string | number): Promise<Post> {
  const res = await axios.get<Post>(`${API_URL}/post/${id}`);
  return res.data;
}

/**
 * /post
 * Create post
 * @param post
 * @returns Post
 */
export async function createPost(post: SendPost): Promise<Post> {
  const res = await axios.post<Post>(`${API_URL}/post`, post);
  return res.data;
}

/**
 * /posts/:id
 * Update post
 * @param id
 * @param post
 * @returns Post
 */
export async function updatePost(
  id: string | undefined,
  post: SendPost
): Promise<Post> {
  const res = await axios.put<Post>(`${API_URL}/post/${id}`, post);
  return res.data;
}

/**
 * /post/:id
 * Delete post
 * @param id
 * @returns Post
 */
export async function deletePost(id: string | undefined) {
  const res = await axios.delete(`${API_URL}/post/${id}`);
  return res.data;
}

/**
 * /posts/ongoing
 * Get ongoing posts
 * @returns Post[]
 */
export async function getOngoingPosts(
  page: number,
  subject?: string,
  host?: string
): Promise<PaginatedResponse<Post>> {
  const params = new URLSearchParams();
  params.append("page", String(page));

  if (subject) {
    params.append("subject", subject);
  }

  if (host) {
    params.append("host", host);
  }

  const res = await axios.get<PaginatedResponse<Post>>(
    `${API_URL}/post/ongoing`,
    { params }
  );
  return res.data;
}

/**
 * /posts/past
 * Get past posts
 * @returns Post[]
 */
export async function getPastPosts(
  page: number,
  subject?: string,
  host?: string
): Promise<PaginatedResponse<Post>> {
  const params = new URLSearchParams();
  params.append("page", String(page));

  if (subject) {
    params.append("subject", subject);
  }

  if (host) {
    params.append("host", host);
  }

  const res = await axios.get<PaginatedResponse<Post>>(`${API_URL}/post/past`, {
    params,
  });
  return res.data;
}

/**
 * /posts/search
 * Search posts
 * @param subject
 * @param host
 * @returns Post[]
 */
export async function searchPosts(
  subject?: string,
  host?: string
): Promise<PaginatedResponse<Post>> {
  const params = new URLSearchParams();

  if (subject) {
    params.append("subject", subject);
  }
  if (host) {
    params.append("host", host);
  }

  const res = await axios.get<PaginatedResponse<Post>>(
    `${API_URL}/post/search`,
    { params }
  );
  return res.data;
}
