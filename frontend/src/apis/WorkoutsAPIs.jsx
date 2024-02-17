import { get } from "lodash";
import AxiosDefaultSetting from "../services/AxiosDefaultSetting";

const getWorkouts = async () => {
  return await AxiosDefaultSetting({ method: "GET", url: "/workouts" })
    .then((result) => {
      if (get(result, "data.status", 0) === 200) {
        return get(result, "data", null);
      }
    })
    .catch((err) => {
      return get(err, "response", {});
    });
};

const createWorkout = async (values) => {
  return await AxiosDefaultSetting({
    method: "POST",
    url: "/workouts",
    data: values,
  })
    .then((result) => {
      if (get(result, "data.status", 0) === 200) {
        return get(result, "data", null);
      }
    })
    .catch((err) => {
      return get(err, "response", {});
    });
};

export { getWorkouts, createWorkout };
