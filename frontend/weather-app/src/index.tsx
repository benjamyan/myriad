import * as React from "react";
import * as ReactDOM from "react-dom";

import { WeatherApp } from './views/WeatherApp';

ReactDOM.render(
    <React.StrictMode>
        <WeatherApp />
    </React.StrictMode>,
    document.getElementById("root")
);
