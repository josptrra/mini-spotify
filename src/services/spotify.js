import axios from "axios";

const clientId = "a41f5f62d5254263aa279b3d8291ceb7";
const clientSecret = "0a9d61c9663c417690da1911ca6c2408";

export const getAccessToken = async () => {
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      "grant_type=client_credentials",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        },
      }
    );

    console.log("Access token berhasil didapat:", response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.error("Error mendapatkan access token:", error);
    throw error;
  }
};

export const searchTracks = async (query) => {
  try {
    const accessToken = await getAccessToken();

    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
      )}&type=track&limit=20`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("Search berhasil:", response.data.tracks.items);
    return response.data.tracks.items;
  } catch (error) {
    console.error("Error searching tracks:", error);
    throw error;
  }
};

export const getPopularTracks = async () => {
  try {
    const accessToken = await getAccessToken();

    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=year:2024&type=track&limit=20&market=US`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("Popular tracks berhasil didapat:", response.data.tracks.items);
    return response.data.tracks.items;
  } catch (error) {
    console.error("Error getting popular tracks:", error);
    throw error;
  }
};
