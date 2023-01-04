// https://github.com/TimboKZ/chonky-website/blob/master/2.x_storybook/src/demos/VFSReadOnly.tsx

import * as React from 'react';
import {
    ChonkyActions,
    ChonkyFileActionData,
    FileArray,
    FileBrowser,
    FileContextMenu,
    FileData,
    FileHelper,
    FileList,
    FileNavbar,
    FileToolbar,
    setChonkyDefaults
} from 'chonky';
import { ChonkyIconFA } from 'chonky-icon-fontawesome';
import { GiHamburgerMenu } from 'react-icons/gi'
import { HiOutlineSearch } from 'react-icons/hi';

import { chonky } from '../../libs';
import { Button } from '../../components';
import { ExpectedFileExplorerProps, FileMap } from './types';
import './_FileExplorer.scss';

let rootFolderId: string = undefined!,
    fileMap: FileMap = undefined!;

export const useFiles = (currentFolderId: string): FileArray => {
    return React.useMemo(() => {
        const currentFolder = fileMap[currentFolderId];
        const files = currentFolder.childrenIds
            ? currentFolder.childrenIds.map((fileId: string) => fileMap[fileId] ?? null)
            : [];
        return files;
    }, [currentFolderId]);
};

export const useFolderChain = (currentFolderId: string): FileArray => {
    return React.useMemo(() => {
        const currentFolder = fileMap[currentFolderId];

        const folderChain = [currentFolder];

        let parentId = currentFolder.parentId;
        while (parentId) {
            const parentFile = fileMap[parentId];
            if (parentFile) {
                folderChain.unshift(parentFile);
                parentId = parentFile.parentId;
            } else {
                parentId = null;
            }
        }

        return folderChain;
    }, [currentFolderId]);
};

export const useFileActionHandler = (
    setCurrentFolderId: (folderId: string) => void
) => {
    return React.useCallback(
        (data: ChonkyFileActionData) => {
            if (data.id === ChonkyActions.OpenFiles.id) {
                const { targetFile, files } = data.payload;
                const fileToOpen = targetFile ?? files[0];
                if (fileToOpen && FileHelper.isDirectory(fileToOpen)) {
                    setCurrentFolderId(fileToOpen.id);
                    return;
                }
            }

            // showActionNotification(data);
        },
        [setCurrentFolderId]
    );
};

type FileExplorerProps = {
    // folderId: string;
    instanceId: string;
}

const FileExplorer = (props: FileExplorerProps): JSX.Element => {
    const [currentFolderId, setCurrentFolderId] = React.useState<string>(rootFolderId);
    const [ activeToolbar, setActiveToolbar ] = React.useState<'ACTIONS' | 'SEARCH' | false>(false);

    const files = useFiles(currentFolderId);
    const folderChain = useFolderChain(currentFolderId);
    const handleFileAction = useFileActionHandler(setCurrentFolderId);

    const toolbarRef = React.useRef(null)

    const toolbarIconOnClickHandler = React.useCallback(
        (origin: Extract<typeof activeToolbar, string>, event: React.MouseEvent)=> {
            if (origin === activeToolbar) {
                setActiveToolbar(false);
            } else {
                setActiveToolbar(origin);
            }
        },
        [ activeToolbar ]
    );

    return (
        <FileBrowser
            // { ...chonky.chonkySettings }
            instanceId={props.instanceId}
            files={ files }
            folderChain={ folderChain }
            onFileAction={ handleFileAction }
            thumbnailGenerator={(file: FileData) =>
                file.thumbnailUrl ? `https://chonky.io${file.thumbnailUrl}` : null
            }
        >
            <nav className='file__explorer--nav'>
                <FileNavbar />
                <div ref={ toolbarRef } className='file__explorer--nav-toolbar'>
                    <Button.IconButton 
                        size='INHERIT'
                        icon={HiOutlineSearch}
                        onSingleClick={ toolbarIconOnClickHandler.bind(null, 'SEARCH') }
                    />
                    <Button.IconButton 
                        size='INHERIT'
                        icon={GiHamburgerMenu}
                        onSingleClick={ toolbarIconOnClickHandler.bind(null, 'ACTIONS') }
                    />
                    <aside className={`file__explorer--nav-toolbar__container file__explorer--nav-toolbar__${activeToolbar ? activeToolbar.toLocaleLowerCase() : 'disabled'}`}>
                        <FileToolbar />
                    </aside>
                </div>
            </nav>
            <FileList />
            {/* <FileContextMenu /> */}
        </FileBrowser>
    );
}

export const FileExplorerWrapper = (props: ExpectedFileExplorerProps): JSX.Element => {
    const { content } = props;
    const [explorerLoaded, setExplorerLoaded] = React.useState<boolean | Error>(false);
    
    React.useEffect(()=>{
        if (!explorerLoaded) {
            try {
                setChonkyDefaults({ ...chonky.chonkySettings, iconComponent: ChonkyIconFA });
                if (!content || content instanceof Error) {
                    throw new Error('Bad props')
                } else if (content === 'LOADING' || content === 'OFFLOAD') {
                    throw new Error('Unexpected content')
                } else if (content.rootFolderId && content.fileMap) {
                    if (!rootFolderId && !fileMap) {
                        rootFolderId = content.rootFolderId;
                        fileMap = content.fileMap;
                    }

                    if (rootFolderId !== undefined && rootFolderId.length > 0) {
                        setExplorerLoaded(true)
                        return
                    }
                    throw new Error('Failed to write to local variable')
                }
                throw new Error('Failure to load component data')
            } catch (err) {
                console.log(err);
                setExplorerLoaded(
                    err instanceof Error
                        ? err
                        : new Error('Unhandled exception loading file explorer')
                )
            }
        }
    }, [])
    
    switch (explorerLoaded) {
        case true: {
            return (
                <div className='file__explorer'>
                    <FileExplorer instanceId='' />
                </div>
            )
        } 
        case false: {
            return <>load</>
        }
        default: {
            return <>{ JSON.stringify(explorerLoaded) }</>
        }
    }
};
