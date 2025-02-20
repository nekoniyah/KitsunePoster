import robot from "robotjs";
import { activeWindow } from "active-win";
import { Jimp } from "jimp"; // We'll need this to convert the raw data to PNG

export default async function takeScreenshot() {
    const window = await activeWindow();
    if (!window) return null;

    const { bounds } = window;
    const capture = robot.screen.capture(
        bounds.x,
        bounds.y,
        bounds.width,
        bounds.height
    );

    // Create a new Jimp image from the raw pixel data
    const image = new Jimp({ width: capture.width, height: capture.height });
    let pos = 0;
    image.scan(0, 0, capture.width, capture.height, (x, y, idx) => {
        const red = capture.image[pos++];
        const green = capture.image[pos++];
        const blue = capture.image[pos++];
        image.bitmap.data[idx + 0] = red;
        image.bitmap.data[idx + 1] = green;
        image.bitmap.data[idx + 2] = blue;
        image.bitmap.data[idx + 3] = 255; // Alpha channel
    });

    // Convert to PNG buffer and then to base64
    const buffer = await image.getBuffer("image/png");
    return "data:image/png;base64," + buffer.toString("base64");
}
