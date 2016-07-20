import { Component, OnInit } from '@angular/core';
// import { NgForm }    from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { FormElementComponent } from  '../components/form/formElement.component';

@Component({
	selector: 'my-about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.scss'],
	directives: [FormElementComponent]
})
export class AboutComponent implements OnInit {
	post: Object;
	forms: any;
	boxTypes: Array <Object> = [];

	constructor(private apiService: ApiService) {
	// Do stuff
		this.post = {
			type: 'text'
		};
	};
	onPostTypeChange = function(value) {
		this.post = {
			type: value
		};
	};
	ngOnInit() {
		this.apiService.getBoxTypes('123123')
			.subscribe( response => {
				this.forms = response;
				for (let i in this.forms) {
					if (this.forms.hasOwnProperty(i)) {
						this.forms[i].type = i;
					}
				};
				this.boxTypes = this.forms.root.children.map(a => { return { 'value': a, name: this.forms[a].label }; });
			});
		console.log('Hello About');
	};

	submit = function(){
		this.apiService.submitForm(this.post);
	};
}
