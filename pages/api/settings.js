import { data } from "./settingsResponse.js";
import { getByParent } from "./settingsMap.js";

export default function handler(req, res) {
  const { query } = req.query;

  if (getByParent(query)) {
    const response = data.filter((item) => item.parent === query.toLowerCase());
    res.status(200).json(response);
  } else {
    res.status(404).json({ message: "Not found" });
  }
}
