import React from "react";

const loading = () => {
  return (
    <div className="home">
      <div
        role="status"
        class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center mt-6"
      >
        <div class="w-full text-center flex flex-col items-center">
          <div class="h-7 mx-4 bg-gray-200 dark:bg-[#33373b] rounded-lg w-[75%] mb-7"></div>
          <div class="h-3 mx-4 bg-gray-200 dark:bg-[#33373b] rounded-sm  w-[95%] mb-2.5"></div>
          <div class="h-3 mx-4 bg-gray-200 dark:bg-[#33373b] rounded-sm  w-[95%] mb-2.5"></div>
          <div class="h-3 mx-4 bg-gray-200 dark:bg-[#33373b] rounded-sm  mb-2.5 w-[95%]"></div>
          <div class="h-3 mx-4 bg-gray-200 dark:bg-[#33373b] rounded-sm  w-[95%] mb-2.5"></div>
          <div class="h-3 mx-4 bg-gray-200 dark:bg-[#33373b] rounded-sm  w-[95%] mb-2.5"></div>
          <div class="h-3 mx-4 bg-gray-200 dark:bg-[#33373b] rounded-sm  w-[95%]"></div>
        </div>
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default loading;
