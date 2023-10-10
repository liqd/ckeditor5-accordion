import { Command } from 'ckeditor5/src/core';
import { type Writer } from 'ckeditor5/src/engine';

export default class InsertAccordionCommand extends Command {
	public override execute(): void {
		this.editor.model.change( writer => {
			this.editor.model.insertContent( this.createAccordion( writer ) ); } );
	}

	public override refresh(): void {
		const model = this.editor.model;
		const selection = model.document.selection;
		const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition()!, 'accordion' );
		this.isEnabled = allowedIn !== null;
	}

	private createAccordion( writer: Writer ) {
		const accordion = writer.createElement( 'accordion' );
		const accordionTitle = writer.createElement( 'accordionTitle' );
		const accordionContent = writer.createElement( 'accordionContent' );

		writer.append( accordionTitle, accordion );
		writer.append( accordionContent, accordion );
		writer.appendElement( 'paragraph', accordionContent );

		return accordion;
	}
}
