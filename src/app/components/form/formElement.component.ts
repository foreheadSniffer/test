import {Component, Input, OnInit} from '@angular/core';

@Component({
	selector: 'my-form-element',
	templateUrl: 'formElement.component.html'
})

export class FormElement implements OnInit{
	@Input() box: Object;
	constructor() {
		console.log(this.box)

	}

	ngOnInit() {
		console.log(this.box)
	}
}