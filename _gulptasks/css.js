import {
	src,
	dest
} from "gulp";
import sass from "gulp-sass";
import cssnano from "cssnano";
import rename from "gulp-rename";
import plumber from "gulp-plumber";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import sourcemap from "gulp-sourcemaps";
import cssSort from "css-declaration-sorter";

export const cssTask = () => {
	return src(["src/styles/**.scss"])
		.pipe(sourcemap.init())
		.pipe(plumber(function(err) {
			console.log("========= ERROR! =========");
			console.log(err);
			console.log("=========================");
			this.emit('end');
		}))
		.pipe(sass.sync())
		.pipe(postcss([
			autoprefixer({
				browsers: ["last 4 version", "IE 9"],
				cascade: false
			}),
			cssnano(),
			cssSort({
				order: "concentric-css",
			})
		]))
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(sourcemap.write("."))
		.pipe(dest("dist/css"))
}

module.exports = cssTask;