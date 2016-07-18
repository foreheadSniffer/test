import { Component, OnInit } from '@angular/core';
import { NgForm }    from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { FormElement } from  '../components/form/formElement.component';

@Component({
  selector: 'my-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  directives: [FormElement]
})
export class AboutComponent implements OnInit {
	_apiService
	post: Object;
	forms: any;
	boxTypes: Array <Object> = [];

	constructor(api: ApiService) {
	// Do stuff
		this.post = {
			type: 'text'
		}
		this._apiService = api;
	};
	onPostTypeChange(value) {
		this.post = {
			type: value
		}
		console.log(value)
	};
	ngOnInit() {
		this._apiService.getBoxTypes()
			.subscribe( response => {
				this.forms = response;
				for (let i in this.forms) {
					this.forms[i].type = i;
				}
				this.boxTypes = this.forms.root.children.map(a => {return {'value':a, name:this.forms[a].label} });
				console.log(this.forms)
			})

		console.log('Hello About');
	}

}
