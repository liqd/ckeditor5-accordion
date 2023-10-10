import type { Accordion } from './index';

declare module '@ckeditor/ckeditor5-core' {
	interface PluginsMap {
		[ Accordion.pluginName ]: Accordion;
	}
}
