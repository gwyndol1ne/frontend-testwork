import axios from "axios";

const API_KEY = "873fa71c061b0c36d9ad7e47ec3635d9";
export const getExcursions = async () => {
  const response = await axios.get(`https://api.sputnik8.com/v1/products`, {
    params: { api_key: API_KEY, username: "frontend@sputnik8.com" },
  });
  return response.data;
};

export const getCities = async () => {
  const response = await axios.get(`https://api.sputnik8.com/v1/cities`, {
    params: { api_key: API_KEY, username: "frontend@sputnik8.com" },
  });
  return response.data;
};
