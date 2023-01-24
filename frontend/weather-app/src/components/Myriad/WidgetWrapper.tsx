import * as React from 'react';
import * as wi from 'react-icons/wi';
import * as ai from 'react-icons/ai';
import * as fa from 'react-icons/fa';

import { Wrapper } from 'myriad-ui';

import 'myriad-ui/lib/utils/styles/styles.scss';
import './_WeatherApp.scss';

export interface MyriadFrontendWidgetProps {
    /** The frontends top-level classname */
    appClassName: string;
    /** Optionally you can pass a classname from the parent to _override_ the default widget classname 
     * @if provided: "`{ widgetClassName }`"
     * @else "`{ appClassName }_widget` "
     * 
     * @important Regardless if its given or not, the top-most parent will always have the "`{ appClassName }_widget` " included
     */
    widgetClassName?: string;
}

let widgetParentClassname = 'DEFAULT_widgetParentClassname',
    widgetClassName = 'DEFAULT_widgetClassName';

export const WeatherWidget = (props: MyriadFrontendWidgetProps)=> {
    const { appClassName } = props;

    widgetParentClassname = appClassName + '_widget';
    widgetClassName = widgetParentClassname;
    if (props.widgetClassName !== undefined) {
        widgetClassName = props.widgetClassName;
    }

    // return (
    //     <section className={widgetParentClassname}>
        
    //     </section>
    // )
    
}
