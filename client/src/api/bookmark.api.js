import axios from "./axios";

// POST /api/bookmarks/news
export const bookmarkNews = (article) =>
  axios.post("/bookmarks/news", {
    newsId: article.id,
    title: article.title,
    image: article.image,
    description: article.description,
    source: article.source,
    officialUrl: article.officialUrl,
  });

// DELETE /api/bookmarks/news/:newsId
export const removeBookmark = (newsId) =>
  axios.delete(`/bookmarks/news/${newsId}`);

// GET /api/bookmarks/news
export const getBookmarks = () => axios.get("/bookmarks/news");
