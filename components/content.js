import React, { useContext } from "react";
import { FaBeer } from "react-icons/fa";
import Image from "next/image";
import { SettingsContext } from "../context/settingContext";
import ImageSettings from "./imageSettings";

export default function Content() {
  const {
    states: { url, baseUrl },
  } = useContext(SettingsContext);
  console.log(url);

  const myLoader = ({ src, width, quality }) => {
    return url;
  };

  return (
    <div id="content" className=" h-screen w-screen">
      <div className="m-auto w-full text-center">
        <div className="relative m-auto w-[1096px] h-[730px]">
          <div>
            <Image
              className="rounded-xl z-10"
              layout="fill"
              objectFit="cover"
              src={url}
            />
          </div>
        </div>
        <div className="text-white">{url}</div>
      </div>
    </div>
  );
}
