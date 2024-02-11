import axios from "axios";
import { getRecoil } from "recoil-nexus";
import { authState } from "../atoms/authAtom";
import { auth } from "../types/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  try {
    const authInfo : auth = getRecoil(authState);
    // const token = store.getState().auth.token;
    if (config?.headers){
      config.headers.authorization = `Bearer ${authInfo.token}`;
    }
  } catch (e){
    console.info('Fallo al agregar el token.', e)
  }
  return config;
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error?.code === "ERR_CANCELED") {
      return Promise.reject(false)
    } else {
      return Promise.reject(error);
    }
  }
);

export default api;