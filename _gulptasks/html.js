import {
	src,
	dest
} from "gulp";
import pug from "gulp-pug";
import plumber from "gulp-plumber";

export const pugTask = () => {
	return src([
			"src/pages/*.pug",
			"!src/pages/\_*.pug"
		])
		.pipe(plumber(function (err) {
			console.log("========= ERROR! =========");
			console.log(err);
			console.log("=========================");
			this.emit('end');
		}))
		.pipe(pug({
			pretty: "\t",
		}))
		.pipe(dest("dist"))
};

module.exports = pugTask;