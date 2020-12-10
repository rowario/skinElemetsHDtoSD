const sharp = require('sharp');
const fs = require('fs');
const sizeOf = require('image-size');

let resizeFolder = './to_resize/';
let resizeFolderOut = './output/';

fs.readdir(resizeFolder, (err, files) => {
	console.log("Files to change:",files);
	files.forEach(file => {
		sizeOf(resizeFolder + file, function (err, dimensions) {
			let {width,height} = dimensions,
				newFilename = resizeFolderOut + file.replace("@2x","");
			sharp(resizeFolder + file).resize({ width: width / 2, height: height / 2 }).toFile(newFilename)
				.then(() => console.log(newFilename + " Successfully changed"))
				.catch(() => console.log(newFilename + " Error occurred"))
		});
	});
});
