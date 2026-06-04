import axios from "axios";

export const fetchLaunches = async (limit = 10, offset = 0) => {
  const response = await axios.get(
    `${process.env.LL2_BASE_URL}?limit=${limit}&offset=${offset}`,
  );

  return response.data.results.map((launch) => ({
    id: launch.id,

    title: launch.name,

    image: launch.image,

    launchDate: launch.net,

    status: launch.status?.name,

    shortDescription:
      launch.mission?.description || "No mission description available.",

    missionType: launch.mission?.type || "Unknown",

    orbit: launch.mission?.orbit?.name || "Unknown",

    rocket: {
      name: launch.rocket?.configuration?.full_name || "Unknown",

      family: launch.rocket?.configuration?.family || "Unknown",

      manufacturer:
        launch.rocket?.configuration?.manufacturer?.name || "Unknown",
    },

    launchPad: {
      name: launch.pad?.name || "Unknown",

      location: launch.pad?.location?.name || "Unknown",

      country: launch.pad?.location?.country_code || "Unknown",
    },

    infoURLs: launch.infoURLs || [],

    vidURLs: launch.vidURLs || [],
  }));
};
