import screenshot from "screenshot-desktop";

export default async function takeScreenshot() {
  return (
    "data:image/png;base64," +
    Buffer.from(await screenshot({ format: "png" })).toString("base64")
  );
}
