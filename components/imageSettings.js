import React, { useState } from "react";
import SliderBar from "./sliderBar";

export default function ImageSettings({ id, title, query, settings }) {
  const [active, setActive] = useState(true);

  const handleActiveCheckBox = (e) => {
    e.preventDefault();
    setActive(!active);
  };

  return (
    <div key={id}>
      <div key={id} className="max-w-lg mx-auto">
        <details
          className="open:bg-gray-900 dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-4"
          close="true"
        >
          <summary className="text-sm leading-6 text-slate-300 dark:text-white font-semibold select-none">
            {title}{" "}
          </summary>
          <div className="mt-3 text-sm leading-6 text-slate-100 dark:text-slate-400">
            {settings && settings.slider && (
              <SliderBar query={query} settings={settings} />
            )}
          </div>
        </details>
      </div>
      <div />
    </div>
  );
}
