var 
	graphicsMagick = require('./build/Release/GraphicsMagick'),
	fs = require('fs');

var inputFile = "test.jpg";
var outputFile = "output.jpg";

console.log("Opening "+inputFile+"...")
fs.readFile(inputFile, function (err, data) {
	
	if (err) 
		throw err;
	
	console.log("Reading image...");
	var inputImage = graphicsMagick.image(data);
	
	console.log("Image has following properties: ");
	console.log("Width: "+inputImage.width);
	console.log("Height: "+inputImage.height);
		
	console.log("Creating output image...");
	var outputImage = inputImage
		.crop(Math.floor(inputImage.width/2 - 200/2), Math.floor(inputImage.height/2 - 200/2), 200, 200)
		.resize(100, 100);
	
	console.log("Creating write stream for "+outputFile+"...");
	var writeStream = fs.createWriteStream(outputFile);
	
	writeStream.on("end", function(){
		console.log("Done.");
	});
	
	console.log("Writing new image data...");
	writeStream.write(outputImage.buffer);
	console.log("Closing stream...");
	writeStream.end();
	
	
	
	
});
