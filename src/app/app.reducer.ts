import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, SerializedRouterStateSnapshot } from '@ngrx/router-store';

export interface AppState {
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
};
