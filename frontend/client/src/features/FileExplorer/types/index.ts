import { FileData } from "chonky";
import { ApplicationRenderProps } from "../../../types";

export type ExpectedFileExplorerProps = ApplicationRenderProps<Record<string, any>>

// export type ExpectedFileExplorerContent = {
//     content: Parameters<ApplicationRenderComponent>[0]['content'] & {
//         rootFolderId: string;
//         fileMap: FileMap;
//     };
//     options: Parameters<ApplicationRenderComponent>[0]['options'];
// }

export type SingleFile = FileData & { childrenIds: string[] };

export type FileMap = {
    [fileId: string]: SingleFile;
};
