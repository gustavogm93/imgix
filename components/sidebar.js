import React from "react";
import { AiOutlineRotateLeft } from "react-icons/ai";
import { BsBrightnessHigh } from "react-icons/bs";

import { FaBeer } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="flex bg-gray-800 text-center z-10">
      <div className="flex-initial w-20 max-w-20 ">
        {" "}
        <div className="">
          <ul className="flex  m-auto justify-center mt-10 rounded-lg bg-gray-900 py-2 cursor-pointer w-16">
            <AiOutlineRotateLeft className="text-white text-2xl" />{" "}
          </ul>
        </div>
        <ul className="flex justify-center mt-10">
          <BsBrightnessHigh className="text-white text-2xl" />
        </ul>
      </div>
      <div className="flex-initial bg-red-400 w-72 max-w-72  ">
        <h2>This is the sidebar extra </h2>
      </div>
    </div>
  );
}
