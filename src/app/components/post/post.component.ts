import {Component, Input, OnInit} from '@angular/core';
import {TextPostComponent} from '../textPost/textPost.component.ts';
import {ImagePostComponent} from '../imagePost/imagePost.component.ts';

@Component({
	selector: 'my-post',
	templateUrl: 'post.component.html',
	styleUrls: ['./post.component.scss'],
	directives: [TextPostComponent, ImagePostComponent]
})

export class PostComponent implements OnInit {
	@Input() post: Object;
	constructor() {
	};
	ngOnInit() {
	}
}
