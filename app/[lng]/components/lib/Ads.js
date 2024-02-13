import axios from "axios";
import { ADSAPI } from "./apis";

export default async function Ads() {
  try {
    const res = await axios.get(`${ADSAPI}`);
    // setAds(res.data.data);
    // setLoading(false);
    const req = res.data
    return req;
  } catch (error) {
    // console.log(error);
    // setLoading(false);
    return error;
  }
}
