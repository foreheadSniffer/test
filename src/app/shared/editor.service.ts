import {Injectable} from '@angular/core';
import {ApiService} from './api.service';

@Injectable()

export class EditorService{
	constructor(private apiService: ApiService){
	}
	auth = function(login: String, password: String){
		this.apiService.postData('/access_token').map(response => response.json());
	}
}