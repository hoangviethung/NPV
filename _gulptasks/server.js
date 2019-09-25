import {
	watch,
	series,
	parallel
} from "gulp"
import bSync from "browser-sync";
import jsCore from "./core-js"
import jsTask from "./script"
import pugTask from "./html"
import cssCore from "./core-css"
import cssTask from "./css"
import {
	copyImage,
	copyVideo,
	copyJs,
} from "./copy";
import {
	cleanImage,
	cleanVideo
} from "./clean";

export const server = () => {
	bSync.init({
		notify: false,
		server: {
			baseDir: "dist",
		},
		port: 8000
	})

	watch([
		"src/js/*.js"
	], parallel(jsTask,copyJs));

	watch([
		"src/pages/**/**.pug"
	], {
		delay: 800
	}, series(pugTask));

	watch([
		"src/styles/**/**.scss"
	], {
		delay: 800
	}, series(cssTask));

	watch([
		"src/img/**/**.{svg,png,jpg,speg,gif}"
	], {
		delay: 800
	}, series(cleanImage, copyImage));

	watch([
		"./src/vid/**/**.{mkv,mp4,flv,avi}"
	], series(cleanVideo, copyVideo));

	watch([
		"_vendor/**/**.css",
		"_vendor/**/**.js",
		"_vendor.json"
	], parallel(jsCore, cssCore));

	watch([
		"dist"
	]).on("change", bSync.reload);
}

module.exports = server;