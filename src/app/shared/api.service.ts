import {Injectable, EventEmitter} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs';
import {AgamiService} from './agami.service';
import {AppSettings} from './app.settings';
import {EditorService} from './editor.service';

@Injectable()

export class ApiService {
	title = 'Angular 2';
	document: Object;
	accessToken: String;
	posts: Array<Object>;
	documentId: number;
	constructor(public http: Http, public agamiService: AgamiService, public editor: EditorService) {
		this.accessToken = '59726c4ae1036b442691b3cf9046e5e2';
		this.documentId = 140737492802516;
	};

	// Приватные методы класса

	private setHeaders = function(headers:Headers){
		headers.append('x-access-token', this.accessToken);
		headers.append('Content-Type', 'application/json; charset=UTF-8');
	};

	// Обертка для GET запроса с токеном в заголовках
	private getData = function(url: String, host: String = AppSettings.snipe){
		let headers = new Headers();
		this.setHeaders(headers);
		return this.http.get(`${host}/${url}`, {headers: headers});
	};

	// Обертка для POST запроса с токеном в заголовках
	private postData = function(url: String, parameters: Object, host: String = AppSettings.snipe){
		let headers = new Headers();
		this.setHeaders(headers);
		console.log('dsada');
		return this.http.post(`${host}/${url}`, JSON.stringify(parameters), {headers: headers});
	};

	private getRootBox = function(){
		return null;
	}

	// Публчные методы


	authorize = function(login: String, password: String){
		this.editor.auth(login, password).subscribe((token)=> this.token = )
	}


	// Получение

	// Получение записей внутри документа
	getPosts = function (documentId: string, clearCache: boolean = false) {
		if (this.posts && !clearCache) {
			return Observable.of(this.posts);
		};

		return this.getData(`documents/${documentId}/boxes`)
			.map(data => data.json())
			.do(boxes => {
				this.posts = boxes[0] &&  boxes[0].children ? boxes[0].children : [];
				this.rootBoxId = boxes[0].id;
			})
			.share()
			.map(boxes => boxes[0] &&  boxes[0].children ? boxes[0].children : []);
		
	};

	// Получение всех документов типа ОНЛАЙН
	getDocuments = function() {
		return null;
	};

	// Информация о документе
	getDocument = function (documentId: string) {
		if (this.document) {
			return Observable.of(this.document);
		}
		let headers = new Headers();
		this.setHeaders(headers);
		return this.http.get(`documents/${documentId}`,
			{
				headers: headers
			}).map(data => data.json())
			.do(result => this.document = result)
			.share();
	};

	// Получение всех типов элементов (boxes)
	getBoxTypes = function (dpcumentId: string) {
		if (this.document) {
			return Observable.of(this.document.settings.boxes);
		};
		return this.http.get('/document.json')
			.map(data => data.json())
			.do(result => this.document = result)
			.share().map(document => document.settings.boxes);
	};

	// Получение изображения по id
	getImage = function(imageId: number) {
		return this.getData(`attachments/${imageId}`).map(data => data.json().versions).do((data) => {
			if (this.posts) {
				let post = this.posts.find((post)=> post.image_id && post.image_id === imageId)
				if (post) {
					this.posts.image = data;
				}
			}
		}).share();
	}

	// Загрузка
	
	// Загрузка картинки
	uploadFile = function (file) {
		let emitter = new EventEmitter();
		this.agamiService.upload(file, this.token, {});
		this.agamiService.emitter.subscribe(data => this.postData('attachments', {attributes:data}).map(data => data.json()).subscribe(data => emitter.emit(data)));

		return emitter;
	};

	// Отправка формы с постом (box)
	submitForm = function (submitable: any) {
		submitable.parent_id = this.rootBoxId;
		submitable.enabled = false;
		// submitable.position = 1000;
		submitable.align = 'center';
		submitable.created_at = Math.floor(Date.now()/1000);
		this.postData(`${AppSettings.snipe}/boxes`, {attributes: submitable} ).subscribe(a => console.log(a));
		console.log(submitable);
	};
}
