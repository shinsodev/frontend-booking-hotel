import axios from "axios";
export const api = axios.create({
  baseURL: "https://hotelbooking-pk94.onrender.com",
});
export async function getReport(year) {
  try {
    const token = localStorage.getItem("token");
    const result = await api.get("/reports", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        year,
      },
    });
    return result.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      console.error("Authorization error: Access denied (403)");
    }
    throw new Error("Error fetching reports ");
  }
}
