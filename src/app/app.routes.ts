import { provideRouter, RouterConfig } from '@angular/router';

import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { LoginComponent } from './login';

export const routes: RouterConfig = [
	{ path: 'home', component: HomeComponent },
	{ path: 'about', component: AboutComponent },
	{ path: 'login', component: LoginComponent }
];

export const APP_ROUTER_PROVIDERS = [
	provideRouter(routes)
];
