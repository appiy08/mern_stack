import { get } from "lodash";
import AxiosDefault from "../services/AxiosDefaultSetting";

const getWorkouts = async () => {
  return await AxiosDefault({ method: "GET", url: "/workouts" })
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
  return await AxiosDefault({
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

const deleteWorkout = async (id) => {
  return await AxiosDefault({
    method: "DELETE",
    url: `/workouts/${id}`,
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

export { getWorkouts, createWorkout, deleteWorkout };
