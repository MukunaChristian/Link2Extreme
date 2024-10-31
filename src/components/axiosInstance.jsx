// axiosInstance.js
import IPConfig from "../components/IPConfig";
// import UserIDConfig from "./UserIdConfig";
import axios from 'axios';

const Api = IPConfig();
const instance = axios.create({
  baseURL: `${Api}/api/`,
  headers: {
    Accept: 'application/json',
  },
});

export default instance;
