import React from "react";
import ImageSettings from "./imageSettings";
import MenuSidebar from "./menuSidebar";
import * as data from "./imageSettings";
import { useState } from "react";
import { useEffect } from "react";

export default function Sidebar() {
  const [data, setData] = useState([]);

  const getData = () => {
    fetch("api/hello", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
        setData(myJson);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div id="sidebar" className="flex bg-gray-800">
      <MenuSidebar />
      <div className="flex-initial justify-start  w-72 max-w-72  bg-gray-800 divide-y divide-gray-900">
        <ImageSettings />
      </div>
    </div>
  );
}
/*

*/
