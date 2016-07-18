import { Component, OnInit } from '@angular/core';
import {ApiService} from '../shared/api.service';
import {PostComponent} from '../components/post/post.component';
import {filterPublishedPipe} from './postList.pipe';
@Component({
	selector: 'my-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	directives: [PostComponent],
	pipes: [filterPublishedPipe]
})
export class HomeComponent implements OnInit {
	posts: Array<Object>;
	api: ApiService;
	constructor(_api: ApiService) {
		// Do stuff
		this.api = _api;
	}

	ngOnInit() {
		console.log('Hello Home');
		this.api.getPosts(0)
			.map((res) => res.json())
			.subscribe(
					(data) => this.posts = data.posts,
					() => console.log('No data')
				);
	}
}
