import { DefaultUrlSerializer, UrlSerializer, UrlTree } from '@angular/router';

export class CustomUrlSerializer implements UrlSerializer {
parse (url: string): UrlTree {
	const dus = new DefaultUrlSerializer();
	const urlTree = dus.parse(url);
	return urlTree;
}

serialize (tree: UrlTree): string {
	const dus = new DefaultUrlSerializer();
	const path = dus.serialize(tree);
	return decodeURIComponent(path);
	}
}
