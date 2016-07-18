import {Component, Input} from '@angular/core';

@Component({
	selector: 'my-text-post',
	templateUrl: 'textPost.component.html'
})

export class TextPostComponent {
	@Input() post: Object;
}
