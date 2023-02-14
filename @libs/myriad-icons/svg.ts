import { default as Sax } from 'sax'; // https://www.npmjs.com/package/sax
import { default as Fs, promises as Fsp } from 'fs';
import { default as Path } from 'path';

const OUTPUT_ARG = '--output';
const FILELIST_ARG = '--filelist';
let outputDir: string = '';

interface MyriadSaxParser extends Sax.SAXStream {
	_myriad: {
		start: number;
		end: number;
		_shouldOptimize: boolean;
	}
}

/** This utility solves the problem of overbloated SVG `style` tags that a website might use to insert its own assets 
* @param file should be the absolute file path to the SVG asset you want to optimize
* @returns true | Error based on the results of the operation. `true` if a clean resolve occurs, `Error` if.. well, an error. 
*/
const optimizeSvg = function(file: Fs.PathLike): Promise<string | Error> {
	return new Promise(async (resolve, reject)=> {
		Fs.createReadStream(file)
			.pipe(
				Sax.createStream(undefined, {
					normalize: true
				}) as MyriadSaxParser
			)
			.on('doctype', function() {
				this._myriad = {
					start: 0, 
					end: 0,
					_shouldOptimize: false
				};
			})
			.on('opentag', function(node) {
				if (this._parser.tag.name === 'STYLE') {
					this._myriad._shouldOptimize = true;
					this._myriad.start = this._parser.startTagPosition;
				}
			})
			.on('closetag', function(node) {
				if (this._parser.tag.name === 'STYLE') {
					this._myriad.end = this._parser.startTagPosition;
				}
			})
			.on('error', function(err) {
				console.error(err)
				reject(err instanceof Error ? err : new Error('Unhandled exception when optimizing SVG'))
			})
			.on('end', function() {
				try {
					console.log(this._myriad)
					if (this._myriad === undefined || this._myriad.start === 0 || this._myriad.end === 0) {
						resolve(file.toString())
						return
					} else {
						Fsp
							.readFile(file, { encoding:'utf8' })
							.then(async (content)=>{
								await Fsp.rename(
										file, 
										Path.resolve(`${file.toString().split('.svg')[0]}.svg.bak`)
									)
									.catch((err)=>{
										console.error(err)
										reject(err instanceof Error ? err : new Error('Unhandled exception when renaming file'))
										return;
									});
								Fsp.writeFile(
										file, 
										(
											this._myriad._shouldOptimize
												? content.substring(0, this._myriad.start - 1) + content.substring(this._myriad.end)
												: content
										)
										
									)
									.then(()=>{
										resolve(file.toString())
										return;
									})
									.catch((err)=> {
										console.error(err)
										reject(err instanceof Error ? err : new Error('Unhandled exception when optimizing SVG'));
										return;
									});
							})
							.catch((err)=> {
								console.error(err)
								reject(err instanceof Error ? err : new Error('Unhandled exception when optimizing SVG'))
								return;
							});
					}
				} catch (err) {
					console.error(err)
					reject(err instanceof Error ? err : new Error('Unhandled exception when optimizing SVG'))
					return;
				}
			})
	})
};

(async function() {
	if (process.send !== undefined 
		&& process.argv.includes(FILELIST_ARG) 
		&& process.argv.includes(OUTPUT_ARG)
	) {
		process.argv.splice(0, process.argv.findIndex((arg)=>arg===FILELIST_ARG) + 1);
		for (let i = 0; i < process.argv.length; i++) {
			optimizeSvg(process.argv[i])
				.then(()=>{
					process.argv[i] === undefined;
					if (process.argv.filter(Boolean).length === 0) {
						process.exit();
					}
				})
				.catch((err)=>{
					console.error(err);
					process.exit();
				})
		}
	} else {
		process.exit()	
	}
})()