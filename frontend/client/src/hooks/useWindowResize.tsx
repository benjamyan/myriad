import React from 'react';

export function useWindowSize() {
    const [size, setSize] = React.useState([window.innerWidth, window.innerHeight]);
    const [direction, setDirection] = React.useState<-1 | 1>();
    // const [initialized, setInitialized] = React.useState<boolean>(false)
    React.useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
            // setDirection()
        }
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}