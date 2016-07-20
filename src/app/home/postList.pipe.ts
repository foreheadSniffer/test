import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'myFilterPublished',
	pure: false
})
export class FilterPublishedPipe implements PipeTransform {

	transform(items: any[], args: any[]): any {
		return items.filter(item => item.published || args[0]);
	}
}
