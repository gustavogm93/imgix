import React from "react";
import Sidebar from "../components/sidebar";
import Content from "../components/content";
import { SettingProvider } from "../context/settingContext";

export default function Main() {
  return (
    <SettingProvider>
      <div className="flex m-auto w-full ">
        <Sidebar />
        <Content />
      </div>
    </SettingProvider>
  );
}
