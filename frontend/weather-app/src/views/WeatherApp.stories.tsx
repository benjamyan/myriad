import React from 'react';
import { ComponentMeta } from '@storybook/react';

import { WeatherApp } from './WeatherApp';
import { Button } from 'myriad-ui';
// import config from 'assets/icons/config-so.svg';

import 'myriad-ui/lib/utils/styles/styles.scss';

export default {
	/* 👇 The title prop is optional.
	* See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	* to learn how to generate automatic titles
	*/
	title: 'Weather',
	component: WeatherApp,
} as ComponentMeta<typeof Widget | typeof Application>;

export const Widget = () => {
	const [ showWidget, setShowWidget] = React.useState<boolean>(false);

	return (
		<>
			<Button.Basic
				title='show widget'
				onSingleClick={ ()=> setShowWidget(!showWidget) }
			/>
			{ showWidget &&
				<div style={{ 
					width:400,
					height:300,
					margin: 0,
					padding: 0,
					// border: 1px solid $menu
				}}>
					<WeatherApp 
						overrideComponentApiData
						componentData={JSON.stringify({
							latitude: 39.96187,
							longitude: -75.155365,
							generationtime_ms: 0.2759695053100586,
							utc_offset_seconds: 0,
							timezone: 'GMT',
							timezone_abbreviation: 'GMT',
							elevation: 20.0,
							current_weather: {
								temperature: 58.0,
								windspeed: 11.5,
								winddirection: 194.0,
								weathercode: 0,
								time: '2022-12-30T20:00'
							}
						})}
						componentType='widget'
						insertComponent={{
							BeforeBegin: (
								<nav>
									<h5>
										<span>Usercitynamegoeshere</span> ST.
									</h5>
									{/* <div className={`${widgetClassName}--nav-config`}>
										<fa.FaCog />
										<ai.AiFillPushpin />
									</div> */}
								</nav>
							)
						}}
						// PrependComponent={
						// 	<nav>
						// 		<h5>
						// 			<span>Usercitynamegoeshere</span> ST.
						// 		</h5>
						// 		{/* <div className={`${widgetClassName}--nav-config`}>
						// 			<fa.FaCog />
						// 			<ai.AiFillPushpin />
						// 		</div> */}
						// 	</nav>
						// }
						apiParams={{
							latitude: 39.96187,
							longitude: -75.155365
						}} 
					/>
				</div>
			}
		</>
	)
}

export const Application = () => {
	const [ showApplication, setShowApplication] = React.useState<boolean>(false);

	return (
		<>
			Weather application story
			{/* <WeatherApp 
				componentType='application'
				apiParams={{
					latitude: 39.96187,
					longitude: -75.155365
				}} 
			/> */}
		</>
	)
}
