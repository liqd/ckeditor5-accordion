import { Plugin } from 'ckeditor5/src/core';
import {
	Widget,
	toWidget,
	toWidgetEditable
} from 'ckeditor5/src/widget';
import InsertAccordionCommand from './insertaccordioncommand';
import '../theme/accordion.css';

export default class AccordionEditing extends Plugin {
	public static get pluginName() {
		return 'AccordionEditing' as const;
	}

	public static get requires() {
		return [ Widget ] as const;
	}

	public init(): void {
		this.editor.commands.add(
			'insertAccordion',
			new InsertAccordionCommand( this.editor )
		);
		this.defineSchema();
		this.defineConverters();
	}

	private defineSchema() {
		const schema = this.editor.model.schema;
		schema.register( 'accordion', {
			inheritAllFrom: '$blockObject'
		} );

		schema.register( 'accordionTitle', {
			isLimit: true,
			allowIn: 'accordion',
			allowContentOf: '$block'
		} );

		schema.register( 'accordionContent', {
			isLimit: true,
			allowIn: 'accordion',
			allowContentOf: '$root'
		} );

		schema.addChildCheck( ( context, childDefinition ) => {
			if ( context.endsWith( 'accordionContent' ) && childDefinition.name == 'accordion' ) {
				return false;
			}
		} );
	}

	private defineConverters() {
		const conversion = this.editor.conversion;
		conversion.for( 'upcast' ).elementToElement( {
			model: 'accordion',
			view: {
				name: 'div',
				classes: 'collapsible-item'
			}
		} );

		conversion.for( 'dataDowncast' ).elementToElement( {
			model: 'accordion',
			view: {
				name: 'div',
				classes: 'collapsible-item'
			}
		} );

		conversion.for( 'editingDowncast' ).elementToElement( {
			model: 'accordion',
			view: ( modelElement, { writer: viewWriter } ) => {
				const container = viewWriter.createContainerElement( 'div', {
					class: 'collapsible-item'
				} );

				return toWidget( container, viewWriter, {
					label: 'accordion widget'
				} );
			}
		} );

		conversion.for( 'upcast' ).elementToElement( {
			model: 'accordionTitle',
			view: {
				name: 'div',
				classes: 'collapsible-item-title'
			}
		} );

		conversion.for( 'dataDowncast' ).elementToElement( {
			model: 'accordionTitle',
			view: {
				name: 'div',
				classes: 'collapsible-item-title'
			}
		} );
		conversion.for( 'editingDowncast' ).elementToElement( {
			model: 'accordionTitle',
			view: ( modelElement, { writer: viewWriter } ) => {
				const titleBlock = viewWriter.createEditableElement( 'div', {
					class: 'collapsible-item-title'
				} );

				return toWidgetEditable( titleBlock, viewWriter );
			}
		} );

		conversion.for( 'upcast' ).elementToElement( {
			model: 'accordionContent',
			view: {
				name: 'div',
				classes: 'collapsible-item-body'
			}
		} );
		conversion.for( 'dataDowncast' ).elementToElement( {
			model: 'accordionContent',
			view: {
				name: 'div',
				classes: 'collapsible-item-body'
			}
		} );
		conversion.for( 'editingDowncast' ).elementToElement( {
			model: 'accordionContent',
			view: ( modelElement, { writer: viewWriter } ) => {
				const content = viewWriter.createEditableElement( 'div', {
					class: 'collapsible-item-body'
				} );

				return toWidgetEditable( content, viewWriter );
			}
		} );
	}
}
