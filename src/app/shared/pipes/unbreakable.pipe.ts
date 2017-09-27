import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'unbreakable'
})
export class UnbreakablePipe implements PipeTransform {
	transform (value: string): any {
		if (value) {
			return value.replace(/\s/,'&nbsp;');
		}
		return value;
	}
}
