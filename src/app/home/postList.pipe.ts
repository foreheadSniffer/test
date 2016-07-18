import {Pipe, PipeTransform, Injectable} from '@angular/core';

@Pipe({
	name: 'filterPublished',
	pure: false
})
export class filterPublishedPipe implements PipeTransform{

	transform(items: any[], args: any[]): any{
	
		return items.filter(item => item.published || args[0])
	}
}