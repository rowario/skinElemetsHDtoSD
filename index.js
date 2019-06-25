const sharp = require('sharp');
const fs = require('fs');
const sizeOf = require('image-size');

let resizeFolder = './to_resize/';
let resizeFolderOut = './output/';
let filesArr = [];

fs.readdir(resizeFolder, (err, files) => {
	files.forEach(file => {
		filesArr.push(file);
	});
});

console.log("Files to change:");
filesArr.forEach(file => {
	console.log(file);
});
filesArr.forEach(file => {
	sizeOf(resizeFolder + file, function (err, dimensions) {
		var newWidth = parseInt(dimensions.width / 2);
		var newHeight = parseInt(dimensions.height / 2);
		var newFilename = resizeFolderOut + file.replace("@2x","");
		sharp(resizeFolder + file).resize({ width: newWidth,height: newHeight }).toFile(newFilename)
			.then(function(newFileInfo) {
				console.log(newFilename + " Success")
			})
			.catch(function(err) {
				console.log(newFilename + " Error occured");
			});
	});
});
