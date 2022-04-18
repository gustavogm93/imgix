/*const settingsMap = new Map();
settingsMap.set("brightness", "1");
settingsMap.set("contrast", "2");
settingsMap.set("exposure", "3");
settingsMap.set("gamma", "4");
settingsMap.set("highlight", "5");
settingsMap.set("hue", "6");
settingsMap.set("invert", "7");
settingsMap.set("saturation", "8");
settingsMap.set("shadow", "9");
settingsMap.set("sharpen", "10");
settingsMap.set("unsharpMask", "11");
settingsMap.set("unsharkMaskRadius", "12");
settingsMap.set("vibrance", "13");
export default settingsMap;
*/
var settingsParent = new Map();
settingsParent.set("adjustment", "1");
settingsParent.set("rotation", "2");

export function getByParent(parent) {
  return settingsParent.get(parent);
}
