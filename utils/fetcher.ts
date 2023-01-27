import axios from "axios";

export const fetcher = (url) => {
  return axios.get(url).then((r) => r.data);
};
