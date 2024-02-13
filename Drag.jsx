"use client";
import React, { useContext, useEffect, useState } from "react";
// import { Values } from "../components/Context/Context";
import axios from "axios";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { signIn, useSession } from "next-auth/react";
import { Values } from "./app/[lng]/components/Context/Context";

export default function Drag() {
  const { currency, shopping, setShopping } = useContext(Values);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    showCart();
  }, [currency]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const items = Array.from(shopping);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setShopping(items);
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const delItem = (id) => {
    let newCart = shopping.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setShopping(newCart);
  };

  const session = useSession();
  const buyFunction = async () => {
    if (session.status !== "authenticated") {
      signIn();
    } else {
      const token = await session?.data?.user?.token;
      try {
        const response = await axios.post(
          `http://192.168.1.111:8001/api/customer/create_order`,
          {
            id: "1",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const showCart = async () => {
    const cart = localStorage.getItem("cart");
    await setShopping(JSON.parse(cart));
    setLoading(false);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="home pt-7">
        <div className="mx-2">
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="nodeClone text-center pb-2 d-flex flex-column justify-content-center align-items-center mx-1"
              >
                {
                  loading
                    ? ""
                    : //   [...Array(5).keys()].map((item, i) => (
                    //     // Placeholder loading items
                    //   ))""
                    shopping?.length !== 0
                    ? shopping.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="flex shadow-[0_0_5px_#c9c9c9] items-center justify-between rounded-lg px-4 py-2 mb-4 bg-[#eee] dark:bg-[#33373b]"
                            >
                              {/* Item content here */}
                              <button
                                type="button"
                                className="rounded-lg py-1 px-2 bg-[#d54b4b] text-white font-bold"
                                onClick={() => delItem(item.id)}
                              >
                                Del
                              </button>
                            </div>
                          )}
                        </Draggable>
                      ))
                    : ""
                  // Empty cart message
                }
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <button
            type="button"
            className="rounded-lg block w-full py-1 px-2 bg-blue-500 text-[#c7c7c7] font-bold"
            onClick={buyFunction}
          >
            Buy
          </button>
        </div>
      </div>
    </DragDropContext>
  );
}
