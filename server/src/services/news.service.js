import axios from "axios";

export const fetchLatestNews = async (limit = 10, offset = 0) => {
  const response = await axios.get(
    `${process.env.SPACEFLIGHT_API}?limit=${limit}&offset=${offset}`,
  );

  return response.data.results.map((article) => ({
    id: article.id,
    title: article.title,
    image: article.image_url,
    date: article.published_at,
    description: article.summary,
    source: article.news_site,
    officialUrl: article.url,
  }));
};

export const fetchIndiaNews = async (limit = 10, offset = 0) => {
  const response = await axios.get(`${process.env.SPACEFLIGHT_API}?limit=1000`);

  const filteredNews = response.data.results.filter((article) => {
    const text = `${article.title} ${article.summary}`.toLowerCase();

    return (
      text.includes("isro") ||
      text.includes("india") ||
      text.includes("indian") ||
      text.includes("chandrayaan") ||
      text.includes("gaganyaan") ||
      text.includes("aditya-l1") ||
      text.includes("vikram") ||
      text.includes("pragyan")
    );
  });

  const paginatedNews = filteredNews.slice(offset, offset + limit);

  return paginatedNews.map((article) => ({
    id: article.id,
    title: article.title,
    image: article.image_url,
    date: article.published_at,
    description: article.summary,
    source: article.news_site,
    officialUrl: article.url,
  }));
};
