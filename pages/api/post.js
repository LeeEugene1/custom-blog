import { getSortedPostsData } from '/lib/posts.js';
export default function handler(req, res) {
  const allPostsData = getSortedPostsData();
  res.status(200).json({ allPostsData });
}
