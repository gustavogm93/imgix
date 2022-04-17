import React from "react";
import SliderBar from "./sliderBar";

export default function ImageSettings() {
  //modifico el propiedades del settings provider
  return (
    <>
      <div className="max-w-lg mx-auto">
        <details
          className="open:bg-gray-900 dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-6"
          open
        >
          <summary className="text-sm leading-6 text-slate-300 dark:text-white font-semibold select-none">
            Brightness
          </summary>
          <div className="mt-3 text-sm leading-6 text-slate-100 dark:text-slate-400">
            <SliderBar />
          </div>
        </details>
      </div>
      <div className="max-w-lg mx-auto">
        <details
          className="open:bg-gray-900 dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-6"
          open
        >
          <summary className="text-sm leading-6 text-slate-300 dark:text-white font-semibold select-none">
            Brightness
          </summary>
          <div className="mt-3 text-sm leading-6 text-slate-100 dark:text-slate-400">
            <SliderBar />
          </div>
        </details>
      </div>
    </>
  );
}
