import axios from "axios";

export const fetchAPOD = async () => {
  const response = await axios.get(
    `${process.env.NASA_APOD_URL}?api_key=${process.env.NASA_API_KEY}`,
  );

  const data = response.data;

  return {
    title: data.title,
    explanation: data.explanation,
    image: data.url,
    hdImage: data.hdurl || data.url,
    date: data.date,
    mediaType: data.media_type,
    copyright: data.copyright || "NASA",
  };
};
