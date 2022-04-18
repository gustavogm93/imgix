import Slider, { Range } from "rc-slider";
//import use state
import { useContext, useEffect, useState } from "react";
import "rc-slider/assets/index.css";
import { SettingsContext } from "../context/settingContext";

export default function SliderBar({ query, settings }) {
  const { min, max, initialValue, type } = settings.slider;
  const [val, setValue] = useState(initialValue);
  const {
    actions: { handleSettings },
  } = useContext(SettingsContext);
  const HandleValue = (value) => {
    setValue(value);
  };

  const HandleValue2 = (value) => {
    setValue(value);
    handleSettings({ query, value });
  };

  useEffect(() => {
    setValue(initialValue);
  }, []);

  return (
    <div>
      <div>
        {val}
        {type}
      </div>
      <Slider
        color="red"
        inverted={false}
        value={val}
        startPoint={initialValue}
        start={initialValue}
        min={min}
        max={max}
        onAfterChange={HandleValue2}
        onChange={(value) => HandleValue(value)}
      />
    </div>
  );
}
