import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { isLoggedIn } from './auth.selectors';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(isLoggedIn).pipe(tap((isLoggedIn) => {
      if (!isLoggedIn) {
        this.router.navigateByUrl('/login');
      }
    }));
  }
}
