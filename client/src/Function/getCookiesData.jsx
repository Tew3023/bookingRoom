import axios from "axios";

export default async function getCookiesData() {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found");
    }

    const res = await axios.get('http://localhost:3001/cookies', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching cookies data:", error);
    throw error;
  }
}
