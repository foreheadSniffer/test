import {Pipe, PipeTransform, Injectable} from '@angular/core';

@Pipe({
	name: 'myFieldsFilter',
	pure: false
})
@Injectable()
export class MyFieldsFilterPipe implements PipeTransform {
	transform(items: any[], args: any[]): any {
		return items.filter(item => item.name.indexOf('created_at') === -1 && item.name.indexOf('scribble_post') === -1);
	}
}
