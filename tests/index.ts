import { expect } from 'chai';
import { Accordion as AccordionDll, icons } from '../src';
import Accordion from '../src/accordion';

import ckeditor from './../theme/icons/ckeditor.svg';

describe( 'CKEditor5 Accordion DLL', () => {
	it( 'exports Accordion', () => {
		expect( AccordionDll ).to.equal( Accordion );
	} );

	describe( 'icons', () => {
		it( 'exports the "ckeditor" icon', () => {
			expect( icons.ckeditor ).to.equal( ckeditor );
		} );
	} );
} );
