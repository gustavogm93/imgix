import React from "react";
import { AiOutlineRotateLeft } from "react-icons/ai";
import { BsBrightnessHigh } from "react-icons/bs";
import { BiHomeAlt } from "react-icons/bi";
import { BiBorderOuter } from "react-icons/bi";
import { IoIosColorPalette } from "react-icons/io";
import { BsMask } from "react-icons/bs";
import { CgEditNoise } from "react-icons/cg";

export default function MenuSidebar() {
  //modifico el modificator settings
  return (
    <>
      <div className=" w-20 max-w-20 border-dotted border-r-2 border-gray-900">
        {" "}
        <div className="tooltip">
          <ul className="flex m-auto justify-center mt-5  py-2 cursor-pointer w-16">
            <BiHomeAlt className="text-gray-300 text-2xl" />{" "}
            <span className="tooltiptext">Home</span>
          </ul>
        </div>
        <div className="tooltip">
          <ul className="flex m-auto justify-center mt-5 rounded-lg bg-gray-900 py-2 cursor-pointer w-16">
            <AiOutlineRotateLeft className="text-white text-2xl" />{" "}
            <span className="tooltiptext">Rotation</span>
          </ul>
        </div>
        <div className="tooltip">
          <ul className="flex  m-auto justify-center mt-5 rounded-lg bg-gray-900 py-2 cursor-pointer w-16">
            <BsBrightnessHigh className="text-white text-2xl" />
            <span className="tooltiptext">Adjustment </span>
          </ul>
        </div>
        <div className="tooltip">
          <ul className="flex  m-auto justify-center mt-5 rounded-lg bg-gray-900 py-2 cursor-pointer w-16">
            <BiBorderOuter className="text-gray-300 text-2xl" />
            <span className="tooltiptext">Border and padding </span>
          </ul>
        </div>
        <div className="tooltip">
          <ul className="flex  m-auto justify-center mt-5 rounded-lg bg-gray-900 py-2 cursor-pointer w-16">
            <IoIosColorPalette className="text-gray-300 text-2xl" />
            <span className="tooltiptext">Color palette </span>
          </ul>
        </div>
        <div className="tooltip">
          <ul className="flex  m-auto justify-center mt-5 rounded-lg bg-gray-900 py-2 cursor-pointer w-16">
            <BsMask className="text-gray-300 text-2xl" />
            <span className="tooltiptext">Mask image</span>
          </ul>
        </div>
        <div className="tooltip">
          <ul className="flex  m-auto justify-center mt-5 rounded-lg bg-gray-900 py-2 cursor-pointer w-16">
            <CgEditNoise className="text-gray-300 text-2xl" />
            <span className="tooltiptext">Noise reduction</span>
          </ul>
        </div>
      </div>
    </>
  );
}
