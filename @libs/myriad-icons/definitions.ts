import { default as Fs } from 'node:fs';
import { default as Path } from 'node:path';

const TS_FILE_DIR = './src';
const TS_FILE_NAME = 'index';
const DECLARATIONS_FILE_NAME = 'assets';
const INCLUDE_EXT = ['svg','png'];
// const ASSET_DIR_LIST = [
//     'src/assets/icons',
//     'src/assets/images'
// ];

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

(async function () {
    console.log("\nStarting...");
    console.log("\nBuilding asset list");
    
    const assetList = await getFileListRecursively(Path.join(__dirname, 'src/icons'));
    const importList: Record<string, string[]> = {};
    const exportList: Record<string, string[]> = {};
    
    console.log("\nBuilding files...")
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
    
    console.log("\nBuilding file list...")
    let tempDir: string | undefined = null!,
        tempName: string | undefined = null!,
        tempExt: string | undefined = null!,
        duplicateIndex: number = -1,
        namespaceString: string = null!,
        declarationString: string = null!;
    for (let i = 0; assetList.length > i; i++) {
        tempDir = assetList[i].split(Path.resolve(__dirname, TS_FILE_DIR))[1];
        tempExt = assetList[i].split('/').at(-1)?.split('.')[1];
        tempName = assetList[i].split('/').at(-1)?.split('.')[0];
        if (!!tempDir && !!tempName && !!tempExt) {
            tempName = (
                tempName.split('-')
                    .map((substr, i)=>{
                        if (i !== 0) {
                            return substr.charAt(0).toUpperCase() + substr.slice(1)
                        }
                        return substr
                    })
                    .join('')
            );
            if (typeof(tempName) === 'string') {
                if (i > 0 && importList[tempExt] !== undefined) {
                    duplicateIndex = (
                        importList[tempExt].findIndex((importItem)=>importItem.indexOf(` ${tempName} `) > -1)
                    );
                }
                if (duplicateIndex > -1) {
                    console.log(`Duplicate (omiting!): ${tempName}`);
                } else {
                    importList[tempExt].push(`import ${tempName} from '.${tempDir}';`);
                    exportList[tempExt].push(`${tempName}`);
                }
            }
        }
    }
    
    console.log("\nAppending data to files...")
    for await (const ext of INCLUDE_EXT) {
        // console.log(`-- Starting ${ext}`);
        declarationString = ext.charAt(0).toUpperCase() + ext.slice(1);
        namespaceString = declarationString + 'Icon';
        await Fs.promises.writeFile(
            `${TS_FILE_DIR}/${ext}.ts`, 
            `/// <reference path="../${DECLARATIONS_FILE_NAME}.d.ts"/>\n\n${importList[ext].join('\n')}\n\ntype ${namespaceString} = { \n${exportList[ext].map((item)=> `\n${item}: typeof ${item};`).join('\n') }\n};\nconst ${declarationString.toLowerCase()}: Record<keyof ${namespaceString}, ${namespaceString}> = { ${exportList[ext].map((item)=> `\n${item}`).join(',') }};\nexport type { ${namespaceString} };\nexport { ${declarationString.toLowerCase()} };`
            // `${importList[ext].join('\n')}\n\ntype ${namespaceString} = { \n${exportList[ext].map((item)=> `\n${item}: typeof ${item};`).join('\n') }\n};\nconst ${declarationString.toLowerCase()}: Record<keyof ${namespaceString}, ${namespaceString}> = { ${exportList[ext].map((item)=> `\n${item}`).join(',') }};\nexport type { ${namespaceString} };\nexport { ${declarationString.toLowerCase()} };`
        );
        await Fs.promises.appendFile(
            `${TS_FILE_DIR}/${TS_FILE_NAME}.ts`, 
            `export * from './${ext}';\n`
        );
        // console.log(`-- Finished ${ext}\n`);
    }
    
    
    console.log("\n\nDone!\n")
})();