import axios from "axios";
import { PRODUCTAPI, PRODUCTSAPI } from "../components/lib/apis";
import { capitalize } from "../components/lib/capitalize";

export async function generateMetadata({ params: { categoryId, lng } }) {
  try {
    const fetchApiUser = await axios.get(`${PRODUCTAPI}/${categoryId}`);
    return {
      title: capitalize(fetchApiUser?.data?.category_name),
    };
  } catch (error) {
    return {
      title: "not Found page",
    };
  }
  // setInfo(fetchApi.data.data);

  // else {

  // }
}
export async function generateStaticParams() {
  const fetchApiUser = await axios.get(`${PRODUCTSAPI}`);
  const data = await fetchApiUser.data.data;
  return data.map((item) => ({ categoryId: item.id.toString() }));
}

export default async function layout({
  children,
  params: { categoryId, lng },
}) {
  return <>{children}</>;
}

// categoryId;
1;
