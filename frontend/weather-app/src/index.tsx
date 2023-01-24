import * as React from "react";
import * as ReactDOM from "react-dom";

import { WeatherApp } from './views/WeatherApp';

console.log('Starting...')

ReactDOM.render(
    <React.StrictMode>
        <WeatherApp 
            componentType='widget'
            apiParams={{
                latitude: 39.96187,
                longitude: -75.155365
            }} 
        />
    </React.StrictMode>,
    document.getElementById("root")
);
