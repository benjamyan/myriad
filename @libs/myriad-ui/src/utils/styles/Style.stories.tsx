import React from 'react';
import { ComponentMeta } from '@storybook/react';

import './styles.scss'
// import { Button } from '..';

// import config from 'assets/icons/config-so.svg';

export default {
	/* 👇 The title prop is optional.
	* See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	* to learn how to generate automatic titles
	*/
	title: 'Styles',
	// component: Button.Basic,
} as ComponentMeta<any>;

export const Typography = () => {

	return (
		<>
			<h1>Lorem ipsum dolor sit amet</h1>
			<h1>Consectetur adipiscing elit, <br/>sed do eiusmod tempor</h1>
            <br/>
            <h2>Lorem ipsum dolor sit amet</h2>
            <h2>Consectetur adipiscing elit, <br/>sed do eiusmod tempor</h2>
            <br/>
            <h3>Lorem ipsum dolor sit amet</h3>
            <h3>Consectetur adipiscing elit, <br/>sed do eiusmod tempor</h3>
            <br/>
            <h4>Lorem ipsum dolor sit amet</h4>
            <h4>Consectetur adipiscing elit, <br/>sed do eiusmod tempor</h4>
            <br/>
            <h5>Lorem ipsum dolor sit amet</h5>
            <h4>Consectetur adipiscing elit, <br/>sed do eiusmod tempor</h4>
            <br/>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
		</>
	)
}
