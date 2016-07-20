import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';

import {ApiService, AgamiService, AppSettings, EditorService} from './shared';

import '../style/app.scss';

/*
 * App Component
 * Top Level Component
 */
@Component({
	selector: 'my-app', // <my-app></my-app>
	providers: [ApiService, AgamiService, AppSettings, EditorService],
	directives: [...ROUTER_DIRECTIVES],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	url = 'https://github.com/preboot/angular2-webpack';

	constructor(private api: ApiService, private router: Router) {
		console.log(router.routerState)
	}
}
