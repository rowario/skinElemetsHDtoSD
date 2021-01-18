const sharp = require('sharp');
const fs = require('fs');
const sizeOf = require('image-size');

const resizeFolder = './to_resize/';
const resizeFolderOut = './output/';

// Чтение папки
fs.readdir(resizeFolder, (err, files) => {
	console.log("Files to change:",files);
	files.forEach(file => {
		// Определение текущего размера
		sizeOf(resizeFolder + file, function (err, {width,height}) {
			const newFilename = resizeFolderOut + file.replace("@2x","");
			// Изменение размера
			sharp(resizeFolder + file).resize({ width: width / 2, height: height / 2 }).toFile(newFilename)
				.then(() => console.log(newFilename + " Successfully changed"))
				.catch(() => console.log(newFilename + " Error occurred"))
		});
	});
});
