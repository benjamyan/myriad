import * as React from 'react';

import './_Loaders.scss';
import './_HourglassLoader.scss';

export const Hourglass = ()=> {
    // https://codepen.io/adamjld/details/NWxPZY

    return (
        <div className={`loader loader__hourglass`}>
            <div id="hourglass">
                <div className="a"></div>
                <div className="b"></div>
                <div className="c"></div>
                <div className="d"></div>
                <div className="e"></div>
                <div className="f"></div>
                <div className="f"></div>
                <div className="e"></div>
                <div className="d"></div>
                <div className="c"></div>
                <div className="b"></div>
                <div className="a"></div>
            </div>
            <div id="sand">
                <div className="grain g1"></div>
                <div className="grain g2"></div>
                <div className="grain g3"></div>
                <div className="grain g4"></div>
                <div className="grain g5"></div>
                <div className="grain g6"></div>
                <div className="grain g7"></div>
                <div className="grain g8"></div>
                <div className="grain g9"></div>
                <div className="grain g10"></div>
                <div className="grain g11"></div>
                <div className="grain g12 hide"></div>
                <div className="grain g13"></div>
            </div>
        </div>
    )
}
