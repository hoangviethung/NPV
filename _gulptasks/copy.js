import {
	src,
	dest
} from "gulp";
import {
	readFileSync
} from "graceful-fs";

export const copyImage = () => {
	return src("./src/img/**/**.{svg,png,jpg,jpeg,gif}")
		.pipe(dest("dist/img"))
}

export const copyVideo = () => {
	return src("./src/vid/**/**.{mkv,mp4,flv,avi}")
		.pipe(dest("dist/vid"))
}

export const copyFonts = () => {
	let glob = JSON.parse(readFileSync("_vendor.json"));
	let fontList = glob.vendor.font;
	return src(fontList, {
			allowEmpty: true
		})
		.pipe(dest("dist/fonts"));
}

export const copyFavicon = () => {
	return src("src/favicon.ico", {
			allowEmpty: true
		})
		.pipe(dest("dist"));
}

module.exports = {
	copyFonts,
	copyImage,
	copyFavicon,
	copyVideo
};