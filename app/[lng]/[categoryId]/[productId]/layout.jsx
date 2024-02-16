import axios from "axios";
import { PRODUCTAPI, PRODUCYTINFO } from "../../components/lib/apis";
import { capitalize } from "../../components/lib/capitalize";

export async function generateMetadata({
  params: { categoryId, productId, lng },
}) {
  // setInfo(fetchApi.data.data);
  //   console.log(fetchApiUser.data,"a");
  try {
    const fetchApiUser = await axios.get(`${PRODUCYTINFO}/${productId}`);
    return {
      title: capitalize(fetchApiUser?.data?.data?.name),
    };
  } catch (error) {
    return {
      title: "not found",
    };
  }
}
export async function generateStaticParams({ params: { categoryId } }) {
  const fetchApiUser = await axios.get(`${PRODUCTAPI}/${categoryId}`);
  const data = fetchApiUser.data.data;
  return data.map((item) => ({ productId: item.id.toString() }));
}
export default function layout({ children }) {
  return <>{children}</>;
}
