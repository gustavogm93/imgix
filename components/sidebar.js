import React from "react";
import ImageSettings from "./imageSettings";
import MenuSidebar from "./menuSidebar";
import { useState, useEffect, useRef } from "react";

export default function Sidebar() {
  const [data, setData] = useState([{}]);
  const [parent, setParent] = useState("");
  const isInitialMount = useRef(true);

  const handleParent = (e) => {
    e.preventDefault();

    const parentValue = !parent || e.target.id !== parent ? e.target.id : "";
    setParent(parentValue);
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      async function fetchData() {
        if (parent) {
          const data = await fetch(`/api/settings?query=${parent}`);
          const response = await data.json();
          setData(response);
        }
      }
      fetchData();
    }
  }, [parent]);

  return (
    <div id="sidebar" className="flex bg-gray-800 h-screen">
      <MenuSidebar handleParent={handleParent} />
      {parent && data && (
        <div className="flex-initial justify-start  w-72 max-w-72  bg-gray-800 divide-y divide-gray-900">
          {data.map(({ id, title, query, settings }) => (
            <ImageSettings
              key={id}
              id={id}
              title={title}
              query={query}
              settings={settings}
            />
          ))}
        </div>
      )}
    </div>
  );
}
