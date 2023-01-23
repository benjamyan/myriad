import { default as Fs } from 'node:fs';
import { default as Path } from 'node:path';
import { default as Child } from 'node:child_process';
import { performance } from 'node:perf_hooks';

const TS_FILE_DIR = Path.resolve(__dirname, './src');

const ASSET_DIR = 'icons';
const OUTPUT_DIR = Path.join(__dirname, 'lib', ASSET_DIR);

const TS_FILE_NAME = 'index';
const DECLARATIONS_FILE_NAME = 'assets';
const INCLUDE_EXT = ['svg','png'];

const getFileListRecursively = async (dirName: string) => {
    const items = await Fs.promises.readdir(dirName, { withFileTypes: true });
    let files: string[] = [],
        directoryFiles: string[] = [];
        
    for await (const item of items) {
        if (item.isDirectory()) {
            directoryFiles = await getFileListRecursively(`${dirName}/${item.name}`);
            files = [
                ...files,
                ...directoryFiles
            ];
            // files = [...files, ...getFileListRecursively(`${dirName}/${item.name}`)];
        } else if (INCLUDE_EXT.some((ext)=>item.name.endsWith(ext))) {
            files.push(`${dirName}/${item.name}`);
        }
    }

    return files;
};

type MyriadIconProcess = {
    processRuntimeMs: number;
    // svgOptimizeLengthMs: number;
    svgOptimize: {
        uptimeMs: number;
        childProcess: Child.ChildProcess | undefined;
    }
}
const _self: MyriadIconProcess = {
    processRuntimeMs: performance.now(),
    svgOptimize: {
        uptimeMs: -1,
        childProcess: undefined
    }
};

(async function() {
    console.log("\nStarting...");
    // _self.processRuntimeMs = new Date().getMilliseconds();
    
    const assetList = await getFileListRecursively(Path.resolve(__dirname, TS_FILE_DIR, ASSET_DIR));
    const importList: Record<string, string[]> = {};
    const exportList: Record<string, string[]> = {};

    const exitGraceful = ()=> {
        console.log('\n');
        if (_self.svgOptimize.childProcess !== undefined) {
            console.log('SVG Optimization TTC: ' + _self.svgOptimize.uptimeMs + 'ms');
        }
        console.log(`Total process TTC: ${Math.round(performance.now())}ms`);
        process.exit(0)
    }
    
    if (assetList.find((file)=>file.endsWith('.svg')) !== undefined) {
        _self.svgOptimize.childProcess = Child.fork(
            `${__dirname}/svg.ts`,
            [ 
                '--output', OUTPUT_DIR,
                '--filelist', ...assetList.filter((asset)=> asset.endsWith('.svg') && asset)
            ]
        );
        _self.svgOptimize.childProcess.on('spawn', ()=> {
            console.log('Optimizing SVG images...');
            _self.svgOptimize.uptimeMs = Date.parse(new Date().toUTCString());
        });
    }

    console.log("Building files...");
    /** Write the index file the new namespaces will be exported */
    await Fs.promises.writeFile(`${TS_FILE_DIR}/${TS_FILE_NAME}.ts`, '');
    /** Build the namespace file for our specific extension and append that extension to the necessary import/export lists*/
    await Fs.promises.writeFile(`./${DECLARATIONS_FILE_NAME}.d.ts`, '');
    /** Build the individual files for our image exports */
    for await (const ext of INCLUDE_EXT) {    
        /** Build the namespace file for our specific extension and append that extension to the necessary import/export lists*/
        if (!importList[ext]) importList[ext] = [];
        if (!exportList[ext]) exportList[ext] = [];
        await Fs.promises.appendFile(
            `./${DECLARATIONS_FILE_NAME}.d.ts`, 
            `declare module "*.${ext}" {
                const value: any;
                export = value;
            }\n`
        );
    }

    /** Use the asset lists built, parse their extensions, build lists of assets to export */
    console.log("Building file list...");
    let assetDirectory: string | undefined = null!,
        iconAssetName: string | undefined = null!,
        imageExtension: string | undefined = null!;
    parseAssetsToDefinitionsList:
    for (let i = 0; assetList.length > i; i++) {
        assetDirectory = assetList[i].split(Path.resolve(__dirname, TS_FILE_DIR))[1];
        imageExtension = assetList[i].split('/').at(-1)?.split('.')[1];
        iconAssetName = assetList[i].split('/').at(-1)?.split('.')[0];
        if (!!assetDirectory && !!iconAssetName && !!imageExtension) {
            iconAssetName = (
                iconAssetName.split('-')
                    .map((substr, i)=>{
                        if (i !== 0) {
                            return substr.charAt(0).toUpperCase() + substr.slice(1)
                        }
                        return substr
                    })
                    .join('')
            );
            if (typeof(iconAssetName) === 'string') {
                if (i > 0 && importList[imageExtension] !== undefined) {
                    if (importList[imageExtension].includes(iconAssetName as string)) {
                        console.warn(`Duplicate (omiting!): ${iconAssetName}`);
                        continue parseAssetsToDefinitionsList;
                    }
                }
                importList[imageExtension].push(`import ${iconAssetName} from '.${assetDirectory}';`);
                exportList[imageExtension].push(`${iconAssetName}`);
            }
        }
    }

    console.log("Appending data to files...");
    let namespaceString: string = null!,
        declarationString: string = null!;
    for await (const ext of INCLUDE_EXT) {
        declarationString = ext.charAt(0).toUpperCase() + ext.slice(1);
        namespaceString = declarationString + 'Icon';
        await Fs.promises.writeFile(
            `${TS_FILE_DIR}/${ext}.ts`, 
            `/// <reference path="../${DECLARATIONS_FILE_NAME}.d.ts"/>\n\n${importList[ext].join('\n')}\n\ntype ${namespaceString} = { \n${exportList[ext].map((item)=> `\n${item}: typeof ${item};`).join('\n') }\n};\nconst ${declarationString.toLowerCase()}: Record<keyof ${namespaceString}, ${namespaceString}> = { ${exportList[ext].map((item)=> `\n${item}`).join(',') }};\nexport type { ${namespaceString} };\nexport { ${declarationString.toLowerCase()} };`
        );
        await Fs.promises.appendFile(
            `${TS_FILE_DIR}/${TS_FILE_NAME}.ts`, 
            `export * from './${ext}';\n`
        );
    }
    
    if (_self.svgOptimize.childProcess !== undefined) {
        _self.svgOptimize.childProcess
            .on('error', (err)=> {
                console.error(err);
                _self.svgOptimize.uptimeMs = Date.parse(new Date().toUTCString()) - _self.svgOptimize.uptimeMs;
                _self.svgOptimize.childProcess?.emit('finish');
            })
            .on('exit', ()=> {
                _self.svgOptimize.uptimeMs = Date.parse(new Date().toUTCString()) - _self.svgOptimize.uptimeMs;
                _self.svgOptimize.childProcess?.emit('finish');
            })
            .once('finish', exitGraceful);
    } else {
        exitGraceful();
    }
    
})();
