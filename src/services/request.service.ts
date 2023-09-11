import axios from "axios";

const authenticatedAxios = () => axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: window.localStorage.getItem("token"),
  },
});

export default authenticatedAxios;
