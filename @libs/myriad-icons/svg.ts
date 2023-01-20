import { default as Sax } from 'sax'; // https://www.npmjs.com/package/sax
import { default as Fs, promises as Fsp } from 'fs';
import * as Path from 'path';

export interface MyriadSaxParser extends Sax.SAXStream {
	_myriad: {
		start: number;
		end: number;
	}
}

/** This utility solves the problem of overbloated SVG `style` tags that a website might use to insert its own assets 
 * @param file should be the absolute file path to the SVG asset you want to optimize
 * @returns true | Error based on the results of the operation. `true` if a clean resolve occurs, `Error` if.. well, an error. 
 */
export const optimizeSvg = async function(file: Fs.PathLike): Promise<string | Error> {
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
					end: 0
				};
			})
			.on('opentag', function(node) {
				if (this._parser.tag.name === 'STYLE') {
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
			.on('end', async function() {
				try {
					if (this._myriad.start === 0 || this._myriad.end === 0) {
						resolve(file.toString())
						return
					} else {
						const fileContent = await (
							Fsp
								.readFile(file, { encoding:'utf8' })
								.then((content)=>{
									return content.substring(0, this._myriad.start - 1) + content.substring(this._myriad.end)
								})
								.catch((err)=> {
									console.error(err)
									reject(err instanceof Error ? err : new Error('Unhandled exception when optimizing SVG'))
								})
						);
						if (typeof fileContent === 'string') {
							await Fsp.rename(file, Path.resolve(`${file.toString().split('.svg')[0]}.svg.bak`));
							await (
								Fsp
									.writeFile(file, fileContent)
									.then(()=>{
										resolve(file.toString())
										return
									})
									.catch((err)=> {
										console.error(err)
										reject(err instanceof Error ? err : new Error('Unhandled exception when optimizing SVG'))
										return
									})
							)
						} else {
							throw new Error('var fileContent is not of type string')
						}
					}
				} catch (err) {
					console.error(err)
					reject(err instanceof Error ? err : new Error('Unhandled exception when optimizing SVG'))
					return
				}
			});
	})
}
