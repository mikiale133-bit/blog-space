import { API } from "@/api/Axios";

export const getFollowers = async ({ userId }) => {
  try {
    const res = await API.get(`/api/followers/${userId}/followers`);
    return res.data; // <-- Crucial: You must return the data!
  } catch (error) {
    console.error("Error fetching followers:", error);
    throw error;
  }
};

export const getFollowing = async ({ userId }) => {
  try {
    await API.get(`/api/followers/${userId}/followings`);
  } catch (error) {
    console.log(error);
  }
};
