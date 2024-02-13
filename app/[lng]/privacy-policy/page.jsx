import axios from "axios";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { PRIVACY } from "../components/lib/apis";
import { useTranslation } from "@/app/i18n";
import { capitalize } from "../components/lib/capitalize";
export async function generateMetadata({ params: { lng } }) {
  const { t } = await useTranslation(lng);
  return {
    title: capitalize(t("privacy")),
  };
}
export default async function page({ params: { lng } }) {
  const { t } = await useTranslation(lng);
  const session = await getServerSession(authOption);
  const token = await session.user.token;
  // const res = "";
  const req = await axios.get(PRIVACY, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const res = req.data.data;
  return (
    <div className={`${lng === "ar" ? "ar" : ""} home`}>
      <div className="mx-4 my-8 overflow-hidden bg-[#fff] dark:bg-[#414141] privacy rounded-md min-h-[90vh] ">
        <h3 className="font-medium capitalize text-sm text-center dark:bg-[#161616] bg-[rgba(0,0,0,.03)] p-2 dark:text-[#c7c7c7]">
          {t("privacy")}
        </h3>
        {/*  */}
        <div className="px-4 mt-6">
          <div className="">
            <div className="">
              {/* <h2 className="text-2xl dark:text-[#c7c7c7] font-medium text-center my-5">
                privacy policy
              </h2> */}
              <p className="text-[#3f3f3f94] dark:text-[#c7c7c7] text-center">
                {res}
              </p>
            </div>
          </div>
          {/*  */}

          {/*  */}
        </div>
      </div>
    </div>
  );
}
/*

  <div className="my-14">
            <h2 className="text-2xl font-medium text-start">
              why we take information
            </h2>
            <ul className=" list-disc mx-6 my-5">
              <li className="px-2 ">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel at
                vero eaque ipsum soluta omnis?
              </li>
              <li className="px-2 ">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam,
                id.
              </li>
              <li className="px-2 ">Lorem ipsum dolor sit amet.</li>
              <li className="px-2 ">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam,
                id.
              </li>
              <li className="px-2 ">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam,
                id.
              </li>
            </ul>
          </div>
         
          <div className="my-14">
            <div className="">
              <h2 className="text-2xl  font-medium text-center my-5">
                third edge
              </h2>
              <p className="my-1">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum
                doloribus, neque nulla at deleniti aut?
              </p>
              <p className="my-1">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum
                doloribus, neque nulla at deleniti aut? , neque nulla at
                deleniti aut?
              </p>
            </div>
          </div>
        
          {[
            {
              header: "what is cookies",
              details:
                "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earumdoloribus, neque nulla at deleniti aut? Earumdoloribus, neque nulla at deleniti aut?",
            },
            {
              header: "what is cookies",
              details:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis asperiores assumenda illo, dolorem dicta quidem quisquam placeat ipsam impedit saepe. Et distinctio hic voluptatem nisi facilis at, sed provident voluptatum atque placeat perferendis dolorem dicta natus fugiat eligendi numquam accusamus, perspiciatis asperiores. Delectus facilis quaerat soluta dignissimos dolores at? Unde, aliquam distinctio. Voluptate, cumque animi error consequuntur commodi natus provident eaque fuga adipisci architecto inventore culpa reprehenderit eum deleniti corrupti?",
            },
            {
              header: "what is cookies",
              details:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            },
            {
              header: "what is cookies",
              details:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut iure eum iusto labore quaerat fuga facere, similique deserunt perspiciatis ipsa. Dolorum vel sed provident qui, velit veritatis vitae saepe. Odio incidunt vitae dicta in ipsa ad repellat nam? Consectetur commodi obcaecati repudiandae ullam vitae perferendis voluptatum velit reiciendis, quam dolor voluptatem aperiam, iusto debitis beatae doloremque dolorem? Laborum nobis rem aut temporibus ipsa esse in blanditiis vero natus doloremque explicabo accusamus accusantium eius eligendi dolore earum, voluptas mollitia omnis consequuntur est expedita itaque ipsum? Delectus suscipit soluta vitae distinctio facere, consequuntur neque unde asperiores maiores harum repellendus inventore quos blanditiis.",
            },
          ].map((item, i) => {
            return (
              <div className="my-14" key={i}>
                <div className="my-8">
                  <h2 className="text-2xl font-medium text-start my-5">
                    {item.header}
                  </h2>
                  <p className="">{item.details}</p>
                </div>
              </div>
            );
          })}
*/
