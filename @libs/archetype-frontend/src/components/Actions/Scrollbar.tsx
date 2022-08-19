import React from 'react';
import './_Scrollbar.scss';

export const Scrollbar = (scrollbarProps: ScrollbarProps) => {
	const { direction } = scrollbarProps;

	return (
		<aside className={`scrollbar scrollbar__${direction.toLowerCase()} ${scrollbarProps.givenClass}`}>

		</aside>
	)
}

export interface ScrollbarProps {
	[key: string]: any;
	/** Can take a classname */
	givenClass?: string;
	/** The directional axis it displays as */
	direction: 'VERTICAL' | 'HORIZONTAL';
}
