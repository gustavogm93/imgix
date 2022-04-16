import React from "react";
import Sidebar from "../components/sidebar";
import Content from "../components/content";

export default function Main() {
  return (
    <div className="flex m-auto w-full">
      <Sidebar />
      <Content />
    </div>
  );
}
