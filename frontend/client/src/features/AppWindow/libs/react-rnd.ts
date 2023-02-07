import { Props } from "react-rnd";

// const _appWindowClasses = {
//     section: applicationWindowClassName,
//     menu: `${applicationWindowClassName}--menubar`,
//     wrapper: `${applicationWindowClassName}--content`,
//     article: `${applicationWindowClassName}--content-article`,
//     articleInner: `${applicationWindowClassName}--content-article-inner`,
//     scrollX: `${applicationWindowClassName}--scroll ${applicationWindowClassName}--scroll-x`,
//     scrollY: `${applicationWindowClassName}--scroll ${applicationWindowClassName}--scroll-y`,
//     xResize: `${applicationWindowClassName}--resize-x`,
//     yResize: `${applicationWindowClassName}--resize-y`,
//     bothResize: `${applicationWindowClassName}--resize-both`
// }

type RndSettingsProps = {
    className: string;
    menubarClassName: string;
    // position: {
    //     x: number;
    //     y: number;
    // }
}

export const reactRndSettings = (props: RndSettingsProps): Partial<Props> => {

    const { className } = props;

    return {
        as: 'section',
        className,
        // position: props.position,
        // dragHandleClassName: props.menubarClassName,
        disableDragging: false,
        enableResizing: { 
            top: false, 
            right:true, 
            bottom:true, 
            left:false, 
            topRight:false, 
            bottomRight:true, 
            bottomLeft:false, 
            topLeft:false 
        },
        resizeHandleClasses: {
            right: `${className}--resize-x`,
            bottom: `${className}--resize-y`,
            bottomRight: `${className}--resize-both`
        }
    }
}