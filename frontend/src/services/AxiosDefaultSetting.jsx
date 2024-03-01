import axios from "axios";
import { get, isEmpty, isString } from "lodash";
import { Cookies } from "react-cookie";

const AxiosDefaultSetting = async ({ method, url, data, contentType }) => {
  try {
    const cookies = new Cookies();
    const user = cookies.get("user");
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const AxiosDefault = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000, // Adjust timeout as needed
      headers: {
        "Content-Type": isEmpty(contentType) ? "application/json" : contentType,
        Accept: "application/json",
      },
    });

    AxiosDefault.interceptors.request.use(
      function (config) {
        const authToken = `Bearer ${get(user, "token", "")}`;
        if (isString(authToken) && !isEmpty(authToken)) {
          config.headers.authorization = authToken;
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    AxiosDefault.interceptors.response.use(
      function (response) {
        return response;
      },
      async function (error) {
        if (get(error, "response.status") === 401) {
          handleLogout(cookies);
        }
        return Promise.reject(error);
      }
    );

    return await AxiosDefault({
      method,
      url,
      data,
      contentType,
    });
  } catch (error) {
    console.error("An error occurred in AxiosDefaultSetting:", error);
    throw error;
  }
};

const handleLogout = (cookies) => {
  cookies.remove("user");
  // Optionally clear storage based on your requirements
  // localStorage.clear();
  // sessionStorage.clear();
  window.location.replace("/");
};

export default AxiosDefaultSetting;
