import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';
// eslint-disable-next-line
import { add } from '@ckeditor/ckeditor5-utils/src/translation-service';
import ckeditor5Icon from '../theme/icons/ckeditor.svg';

export default class AccordionUI extends Plugin {
	public static get pluginName() {
		return 'AccordionUI' as const;
	}

	public init(): void {
		// Add translations
		add( 'de', { 'Insert accordion': 'Akkordeon einfügen' } );
		const editor = this.editor;
		const t = editor.t;

		// Add the "accordionButton" to feature components.
		editor.ui.componentFactory.add( 'accordionButton', locale => {
			const view = new ButtonView( locale );

			view.set( {
				label: t( 'Insert accordion' ),
				icon: ckeditor5Icon,
				tooltip: true
			} );

			// Insert a text into the editor after clicking the button.
			this.listenTo( view, 'execute', () => {
				editor.execute( 'insertAccordion' );
			} );

			return view;
		} );
	}
}
