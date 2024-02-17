import axios from "axios";
import { get, isEmpty } from "lodash";

const AxiosDefaultSetting = async ({ method, url, data, contentType }) => {
  // const dispatch = useDispatch();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const AxiosDefault = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
    headers: {
      "Content-Type": isEmpty(contentType) ? "application/json" : contentType,
      Accept: "application/json",
    },
  });

  AxiosDefault.interceptors.request.use(
    async function (config) {
      try {
        const authToken = "";
        config.headers.authorization = !isEmpty(authToken) ? authToken : null;
        // if (isString(authToken) && !isEmpty(authToken)) {
        //   config.headers.authorization = authToken;
        // }
      } catch (error) {
        // console.log(error);
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
      try {
        if (get(error, "response.status", 0) === 401) {
          localStorage.clear();
          sessionStorage.clear();
          window.location.replace("/");
          window.location = "/";
        }
      } catch (e) {
        return e;
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
};

export default AxiosDefaultSetting;
