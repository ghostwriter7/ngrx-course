import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from './auth/actions-types';
import { switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  public login = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.login),
    tap(action => {
      localStorage.setItem('user', JSON.stringify(action.user));
    })
  ), {dispatch: false});

  public logout = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.logout),
    tap(() => {
      localStorage.removeItem('user');
      this.router.navigateByUrl('/login');
    })
  ), {dispatch: false});

  constructor(private actions$: Actions,
              private router: Router) {}
}
