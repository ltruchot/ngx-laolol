import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {
	transform (value: string, words?: boolean): any {
		if (value) {
			if (words) {
				return value.replace(/\b\w/g, (first: string) => first.toLocaleUpperCase());
			} else {
				return value.charAt(0).toUpperCase() + value.slice(1);
			}
		}
		return value;
	}
}
