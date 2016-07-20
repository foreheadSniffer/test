import {Component, Input, Output, OnInit, EventEmitter, OnChanges, ElementRef} from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {MyFieldsFilterPipe} from './formField.pipe';


@Component({
	selector: 'my-form-element',
	templateUrl: 'formElement.component.html',
	directives: [FormElementComponent],
	pipes: [MyFieldsFilterPipe]
})

export class FormElementComponent implements OnInit, OnChanges {
	@Input() box: Object;
	@Input() post: any;
	@Output() postChange = new EventEmitter();
	boxTypes: Object;
	view: Object = {};

	constructor(public _apiService: ApiService, public element: ElementRef) {
	};
	initializePost = function() {
		if (this.box['children']) {
			this.post.children = {};
		}
	};
	ngOnChanges(change) {
		this.initializePost();
	};
	ngOnInit() {
		this._apiService.getBoxTypes('123123').subscribe(types => this.boxTypes = types);
		if (!this.post) {
			this.post = {};
		}
		this.initializePost();
	};
	onChange = function(event){
		this._apiService.uploadFile(event.target.files[0]).subscribe(data => {
			this.view['image'] = data.versions;
			this.post.image_id = data.id;
		});
	};
}
