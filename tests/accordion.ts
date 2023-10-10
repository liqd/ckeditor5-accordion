import { expect } from 'chai';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import Accordion from '../src/accordion';

describe( 'Accordion', () => {
	it( 'should be named', () => {
		expect( Accordion.pluginName ).to.equal( 'Accordion' );
	} );

	describe( 'init()', () => {
		let domElement: HTMLElement, editor: ClassicEditor;

		beforeEach( async () => {
			domElement = document.createElement( 'div' );
			document.body.appendChild( domElement );

			editor = await ClassicEditor.create( domElement, {
				plugins: [
					Paragraph,
					Heading,
					Essentials,
					Accordion
				],
				toolbar: [
					'accordionButton'
				]
			} );
		} );

		afterEach( () => {
			domElement.remove();
			return editor.destroy();
		} );

		it( 'should load Accordion', () => {
			const myPlugin = editor.plugins.get( 'Accordion' );

			expect( myPlugin ).to.be.an.instanceof( Accordion );
		} );

		it( 'should add an icon to the toolbar', () => {
			expect( editor.ui.componentFactory.has( 'accordionButton' ) ).to.equal( true );
		} );

		it( 'should add a text into the editor after clicking the icon', () => {
			const icon = editor.ui.componentFactory.create( 'accordionButton' );

			expect( editor.getData() ).to.equal( '' );

			icon.fire( 'execute' );

			expect( editor.getData() ).to.equal( '<div class="collapsible-item">' +
				'<div class="collapsible-item-title">&nbsp;</div>' +
				'<div class="collapsible-item-body"><p>&nbsp;</p>' +
				'</div></div>' );
		} );
	} );
} );
