import screenshot from "screenshot-desktop";
import { activeWindow } from "active-win";
import { Jimp } from "jimp";

export default async function takeScreenshot() {
    try {
        const window = await activeWindow();
        if (!window) return null;

        const { bounds } = window;

        // Ensure bounds are positive values
        const x = Math.max(0, bounds.x);
        const y = Math.max(0, bounds.y);
        const width = Math.max(1, bounds.width);
        const height = Math.max(1, bounds.height);

        // Capture full screen
        const fullScreenBuffer = await screenshot({ format: "png" });

        // Read the buffer with Jimp
        const image = await Jimp.read(fullScreenBuffer);

        // Make sure we don't crop outside image boundaries
        const cropX = Math.min(x, image.height - 1);
        const cropY = Math.min(y, image.width - 1);
        const cropWidth = Math.min(width, image.width - cropX);
        const cropHeight = Math.min(height, image.height - cropY);

        // Crop to active window bounds
        const croppedImage = image.crop({
            x: cropX,
            y: cropY,
            w: cropWidth,
            h: cropHeight,
        });

        // Convert to PNG buffer and then to base64
        const buffer = await croppedImage.getBuffer("image/png");
        return "data:image/png;base64," + buffer.toString("base64");
    } catch (error) {
        console.error("Screenshot error:", error);
        return null;
    }
}
