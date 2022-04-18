export const data = [
  {
    id: 1,
    parent: "adjustment",
    title: "Brightness",
    query: "bri",
    settings: {
      slider: {
        min: -100,
        max: 100,
        initialValue: 0,
        type: "%",
      },
    },
  },
  {
    id: 2,
    parent: "adjustment",
    title: "Contrast",
    query: "con",
    settings: {
      slider: {
        min: -100,
        max: 100,
        initialValue: 0,
        type: "%",
      },
    },
  },
];
