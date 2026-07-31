import sharp from "sharp";

const sourcePath = "public/images/logo.png";
const outputPath = "public/images/logo-on-dark.png";

const { data, info } = await sharp(sourcePath)
	.ensureAlpha()
	.raw()
	.toBuffer({ resolveWithObject: true });

for (let offset = 0; offset < data.length; offset += info.channels) {
	const red = data[offset];
	const green = data[offset + 1];
	const blue = data[offset + 2];
	const alpha = data[offset + 3];

	if (alpha === 0) continue;

	const channelSpread = Math.max(red, green, blue) - Math.min(red, green, blue);

	// Only the neutral black wordmark and registered mark become white.
	// Saturated brand dots retain their original colors pixel-for-pixel.
	if (channelSpread <= 14) {
		data[offset] = 255;
		data[offset + 1] = 255;
		data[offset + 2] = 255;
	}
}

await sharp(data, {
	raw: {
		width: info.width,
		height: info.height,
		channels: info.channels,
	},
})
	.png({ compressionLevel: 9 })
	.toFile(outputPath);

console.log(`Wrote ${outputPath}`);
