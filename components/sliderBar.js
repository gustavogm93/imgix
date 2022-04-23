import Slider, { Range } from "rc-slider";
//import use state
import { useContext, useEffect, useState, useRef } from "react";
import "rc-slider/assets/index.css";
import { SettingsContext } from "../context/settingContext";

export default function SliderBar({ query, settings }) {
  const { min, max, initialValue, type } = settings.slider;
  const [slideValue, setSlideValue] = useState(initialValue);
  const slideRef = useRef(null);
  const {
    actions: { handleSettings },
  } = useContext(SettingsContext);
  const HandleValue = (value) => {
    setSlideValue(value);
  };

  const HandleValue2 = (value) => {
    setSlideValue(value);
    console.log(slideRef);
    handleSettings({ query, value, setSlideValue });
  };

  useEffect(() => {
    setSlideValue(initialValue);
  }, []);

  return (
    <div>
      <div>
        {slideValue}
        {type}
      </div>
      <Slider
        ref={slideRef}
        color="red"
        inverted={false}
        value={slideValue}
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
