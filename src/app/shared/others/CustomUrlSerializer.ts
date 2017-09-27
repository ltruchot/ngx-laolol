import { DefaultUrlSerializer, UrlSerializer, UrlTree } from '@angular/router';

export class CustomUrlSerializer implements UrlSerializer {
parse (url: any): UrlTree {
	const dus = new DefaultUrlSerializer();
	return dus.parse(url);
}

serialize (tree: UrlTree): any {
	const dus = new DefaultUrlSerializer();
	const path = dus.serialize(tree);
	// use your regex to replace as per your requirement.
	// console.log(decodeURIComponent(path));
	return decodeURIComponent(path);
	}
}
