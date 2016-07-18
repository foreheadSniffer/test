import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';

@Injectable()
export class ApiService {
	title = 'Angular 2';
	document: Object;
	http: Http;
	constructor(http: Http) {
		this.http = http;
	};
	getPosts = function (lastPostId: number = -1) {
		return this.http.get('/posts.json');
	};
	getDocument = function () {
		if (this.document)
			return Observable.of(this.document);

		return this.http.get('/document.json').map(data => data.json()).do(result => this.document = result).share();
	}
	getBoxTypes = function () {
		if (this.document)
			return Observable.of(this.document.settings.boxes)
		return this.http.get('/document.json').map(data => data.json()).do(result => this.document = result).share().map(document => document.settings.boxes);
	}
}
