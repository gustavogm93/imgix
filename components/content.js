import React from "react";
import { FaBeer } from "react-icons/fa";
import Image from "next/image";

export default function Content() {
  return (
    <div id="content" className=" h-screen w-screen">
      <div className="m-auto w-full text-center">
        <div className="relative m-auto w-[1096px] h-[730px]">
          <div>
            <Image
              className="rounded-xl"
              layout="fill"
              objectFit="cover"
              src="https://assets.imgix.net/unsplash/bear.jpg"
            />
          </div>
        </div>
        <div className="text-white">Hola</div>
      </div>
    </div>
  );
}
