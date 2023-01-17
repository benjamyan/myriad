import React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Button } from '..';

// import config from 'assets/icons/config-so.svg';

export default {
	/* 👇 The title prop is optional.
	* See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	* to learn how to generate automatic titles
	*/
	title: 'Basic',
	component: Button.Basic,
} as ComponentMeta<typeof Button.Basic>;

export const Basic = () => {

	return (
		<Button.Basic 
			title='Hello world!'
		/>
	)
}

export const EventHandling = () => {

	return (
		<>
			{/* <Button.Basic 
				title='Single click'
				onSingleClick={()=>{
					console.log('Hello single click 1!')
				}}
			/>
			<Button.Basic 
				title='Double click'
				onDoubleClick={()=>{
					console.log('Hello double click 1!')
				}}
			/> */}
			<Button.Basic 
				title='Single click only'
				onSingleClick={()=>{
					console.log('Hello single click only!')
				}}
			/>
			<Button.Basic 
				title='Double click only'
				onDoubleClick={()=>{
					console.log('Hello double click only!')
				}}
			/>
			<Button.Basic 
				title='Single and double Click 1'
				onSingleClick={()=>{
					console.log('Hello single click 1!')
				}}
				onDoubleClick={()=>{
					console.log('Hello double click 1!')
				}}
			/>
			<Button.IconButton 
				// title='Single and double Click 1'
				size='INHERIT'
				icon={'assets/icons/config-so.svg'}
				onSingleClick={()=>{
					console.log('Hello single click 1!')
				}}
				onDoubleClick={()=>{
					console.log('Hello double click 1!')
				}}
			/>
		</>
	)
}
