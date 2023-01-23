import React from 'react';
import { ApplicationRenderComponent, ApplicationRenderProps } from '../../types';

// export type ExpectedImageViewerProps = ApplicationRenderProps<string>;

export const ImageViewer = (props: ApplicationRenderProps<string>): JSX.Element => {
    const [ imageDimensions, setImageDimensions ] = React.useState<[number,number]>([0,0]);
    
    React.useEffect(()=>{
        if (typeof(props.content) === 'string') {
            const ImageCall = new Image();
            ImageCall.onload = function() {
                setImageDimensions([
                    ImageCall.width,
                    ImageCall.height
                ]);
            }
            ImageCall.onerror = function(){
                console.error('Oops! ladoing image')
            }
            ImageCall.src = props.content as string;
        } else {
            //
        }
    }, [])

    return (
        <img 
            src={ props.content as string }
            draggable={ false }
            style={{ 
                objectFit: 'cover',
                width: '100%', 
                minHeight: '100%',
                maxWidth: imageDimensions[0], 
                maxHeight: imageDimensions[1]
            }} 
        />
    )
}

