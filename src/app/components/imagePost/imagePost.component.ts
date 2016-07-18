import {Component, Input} from '@angular/core';

@Component({
	selector: 'my-image-post',
	templateUrl: 'imagePost.component.html'
})

export class ImagePostComponent {
	@Input() post: Object;
}
