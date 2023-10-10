import AccordionEditing from './accordionediting';
import AccordionUI from './accordionui';

import { Plugin } from 'ckeditor5/src/core';

export default class Accordion extends Plugin {
	public static get requires() {
		return [ AccordionEditing, AccordionUI ] as const;
	}
	public static get pluginName() {
		return 'Accordion' as const;
	}
}
