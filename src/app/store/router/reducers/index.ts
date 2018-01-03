import { ActivatedRouteSnapshot, Params, RouterStateSnapshot } from '@angular/router';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

export interface IRouterStateUrl    {
	url: string;
	queryParams: Params;
	params: Params;
}

export interface IRouterState {
	routerReducer: fromRouter.RouterReducerState<IRouterStateUrl>;
}

export const reducers: ActionReducerMap<IRouterState> = {
	routerReducer: fromRouter.routerReducer
};

export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<IRouterStateUrl>>('routerReducer');

export class CustomSerializer implements fromRouter.RouterStateSerializer<IRouterStateUrl> {
	serialize (routerState: RouterStateSnapshot): IRouterStateUrl {
		const { url }: { url: string } = routerState;
		const { queryParams }: { queryParams: Params} = routerState.root;
		let state: ActivatedRouteSnapshot = routerState.root;
		while (state.firstChild) {
			state = state.firstChild;
		}
		const { params }: { params: Params } = state;
		return { url, queryParams, params };
	}
}
