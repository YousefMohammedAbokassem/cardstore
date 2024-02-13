import axios from "axios";
import { ADSAPI, PRODUCTSAPI } from "./apis";

export default async function Categories() {
  try {
    const res = await axios.get(PRODUCTSAPI);
    // setProduct(fetchProduct.data.data);
    // setLoading(false)
    const req = res.data;
    return req;
  } catch (error) {
    // console.log(error);
    // setLoading(false);
    throw new Error(error);
  }
}
