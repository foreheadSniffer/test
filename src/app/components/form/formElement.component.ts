import {Component, Input, Output, OnInit, EventEmitter, OnChanges} from '@angular/core';

@Component({
	selector: 'my-form-element',
	templateUrl: 'formElement.component.html',
	directives: [FormElement]
})

export class FormElement implements OnInit, OnChanges{
	@Input() box: Object;
	@Input() post: any;
	@Output() postChange = new EventEmitter();

	constructor() {
		
	};
	initializePost = function() {
		this.box['attributes'].forEach(attribute => this.post[attribute.name]={value:''});
		if (this.box['children'])
			this.post.children={};
	}
	ngOnChanges(change){
		this.initializePost();
	};
	ngOnInit() {
		if (!this.post) {
			this.post = {};
		}
		this.initializePost();
	}
}