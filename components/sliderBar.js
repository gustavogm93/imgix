import Slider, { Range } from "rc-slider";
//import use state
import { useEffect, useState } from "react";
import "rc-slider/assets/index.css";

export default function SliderBar() {
  const [val, setValue] = useState(0);

  const HandleValue = (value) => {
    console.log(value);
    setValue(value);
  };

  useEffect(() => {
    setValue(0);
  }, []);

  return (
    <div>
      <div>{val}%</div>
      <Slider
        color="red"
        inverted={false}
        start={val}
        min={0}
        max={100}
        step={1}
        onChange={(value) => HandleValue(value)}
      />
    </div>
  );
}
