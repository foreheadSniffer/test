import { Component, OnInit } from '@angular/core';
import {ApiService} from '../shared/api.service';
import {PostComponent} from '../components/post/post.component';
import {FilterPublishedPipe} from './postList.pipe';
@Component({
	selector: 'my-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	directives: [PostComponent],
	pipes: [FilterPublishedPipe]
})
export class HomeComponent implements OnInit {
	posts: Array<Object>;

	constructor(public apiService: ApiService) {

	};

	ngOnInit() {
		console.log('Hello Home');
		this.apiService.getPosts('140737488971022')
			.subscribe(
					(data) => this.posts = data,
					() => console.log('No data')
				);
	}
	refresh = function(){
		this.apiService.getPosts(this.apiService.documnetId, true)
			.subscribe((data) => this.posts = data);
	}
}
