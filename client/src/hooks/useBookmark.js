import { useState, useEffect } from "react";
import {
  bookmarkNews,
  removeBookmark,
  getBookmarks,
} from "../api/bookmark.api";

/**
 * useBookmark
 *
 * Manages bookmark state for a single news article.
 * Checks against the fetched list on mount so the star
 * shows as already-saved if the user bookmarked it before.
 *
 * @param {object} article  - full article object from news API
 * @param {boolean} authStatus - from Redux, so we don't call API if logged out
 */
export function useBookmark(article, authStatus) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  // On mount: check if this article is already bookmarked
  useEffect(() => {
    if (!authStatus) return;
    getBookmarks()
      .then((res) => {
        const list = res.data?.data ?? [];
        const found = list.some((b) => b.newsId === String(article.id));
        setSaved(found);
      })
      .catch(() => {}); // silent — non-critical
  }, [article.id, authStatus]);

  const toggle = async () => {
    if (!authStatus || loading) return;
    setLoading(true);
    try {
      if (saved) {
        await removeBookmark(String(article.id));
        setSaved(false);
      } else {
        await bookmarkNews(article);
        setSaved(true);
      }
    } catch (err) {
      // If already bookmarked (400), treat as saved
      if (err?.response?.status === 400) setSaved(true);
    } finally {
      setLoading(false);
    }
  };

  return { saved, loading, toggle };
}
