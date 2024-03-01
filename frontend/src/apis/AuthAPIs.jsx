import { addHours } from "date-fns";
import { get } from "lodash";
import { Cookies } from "react-cookie";
import AxiosDefault from "../services/AxiosDefaultSetting";

const cookies = new Cookies();

const userSignup = async (values) => {
  return await AxiosDefault({
    method: "POST",
    url: "/user/signup",
    data: values,
  })
    .then((result) => {
      if (get(result, "data.status", 0) === 200) {
        cookies.set("user", get(result, "data.data", null), {
          path: "/",
          expires: addHours(new Date(), 24),
        });
        return get(result, "data", null);
      }
    })
    .catch((err) => {
      return get(err, "response", {});
    });
};

const userLogin = async (values) => {
  return await AxiosDefault({
    method: "POST",
    url: "/user/login",
    data: values,
  })
    .then((result) => {
      if (get(result, "data.status", 0) === 200) {
        cookies.set("user", get(result, "data.data", null), {
          path: "/",
          expires: addHours(new Date(), 24),
        });
        return get(result, "data", null);
      }
    })
    .catch((err) => {
      return get(err, "response", {});
    });
};

export { userLogin, userSignup };

