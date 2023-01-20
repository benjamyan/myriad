import { default as Sax } from 'sax'; // https://www.npmjs.com/package/sax
import * as Fs from 'fs';
import * as Path from 'path';

const newFile = Path.resolve(__dirname, './src/file-image-so-copy.svg');
let strict = true, // set to false for html-mode
	parser = Sax.parser(strict);
// var Sax = require("./lib/Sax"),
//   strict = true, // set to false for html-mode
//   parser = Sax.parser(strict);

// parser.onerror = function (e) {
// 	// an error happened.
// 	console.log("\nonerror")
// 	console.log(e)
// };
// parser.ontext = function (t) {
// 	// got some text.  t is the string of text.
// 	console.log("\nontext")
// 	console.log(t)
// };
// parser.onopentag = function (node) {
// 	// opened a tag.  node has "name" and "attributes"
// 	console.log("\nonopentag")
// 	console.log(node)
// };
// parser.onattribute = function (attr) {
// 	// an attribute.  attr has "name" and "value"
// 	console.log("\nonattribute")
// 	console.log(attr.name)
// 	console.log(attr.value)
// };
// parser.onend = function () {
// 	// parser stream is done, and ready to have more stuff written to it.
// 	console.log("\nonend")
// };

// parser.write('<xml>Hello, <who name="world">world</who>!</xml>').close();

// stream usage
// takes the same options as the parser
var SaxStream = Sax.createStream(undefined, {
	normalize: true
})
SaxStream.on("error", function (e) {
	// unhandled errors will throw, since this is a proper node
	// event emitter.
	console.log("\nerror")
	console.error("error!", e)
	// clear the error
	// this._parser.error = null
	// this._parser.resume()
})
SaxStream.on("opentag", function (node) {
	// same object as above
	console.log("\nopentag")
	console.log(node)
	if (node.name === 'STYLE') {
		console.log(this._parser.line)
		// console.log("\n\nCLOSING")
		// this._parser.close()
		// this._parser.resume()
	} else {
		// Fs.writeFile(newFile, )
	}
	// this._parser.
})
SaxStream.on("closetag", function (node) {
	// same object as above
	console.log("\nclosetag")
	console.log(node)
	if (node === 'STYLE') {
		// console.log("\n\nCLOSING")
		// this._parser.close()
		// this._parser.resume()
	} else {
		//
	}
})
parser.write('<xml>Hello, <who name="world">world</who>!</xml>').close();

// pipe is supported, and it's readable/writable
// same chunks coming in also go out.
Fs.writeFile(newFile, '', (err)=>{
	if (err) console.error(err);
	console.log('\nFile started\n\n')
	Fs
		.createReadStream(Path.resolve(__dirname, './src/file-image-so.svg'))
		.pipe(SaxStream)
})
// Fs.createReadStream(Path.resolve(__dirname, './src/file-image-so.svg'))
// 	.pipe(SaxStream)
//  .pipe(Fs.createWriteStream(Path.resolve(__dirname, './src/file-image-so-copy.svg')))