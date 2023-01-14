import * as chonky from 'chonky'; 

// https://www.npmjs.com/package/chonky
// https://chonky.io/docs/2.x/
// https://github.com/TimboKZ/chonky-website/blob/master/2.x_storybook/src/demos/VFSReadOnly.tsx
const chonkySettings: chonky.FileBrowserProps = {
    /** Required - will change on component data load */
    files: [],
    defaultFileViewActionId: chonky.ChonkyActions.EnableListView.id,
    disableDragAndDrop: true,
    disableDragAndDropProvider: true,
    clearSelectionOnOutsideClick: false
}

export {
    chonkySettings
}
