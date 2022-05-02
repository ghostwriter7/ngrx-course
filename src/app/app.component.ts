import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import { AppState } from './app.reducer';
import { isLoggedIn, isLoggedOut } from './auth/auth.selectors';
import { logout } from './auth/auth.actions';
import { AuthActions } from './auth/actions-types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    loading = true;
    public isLoggedIn$: Observable<boolean>;
    public isLoggedOut$: Observable<boolean>;
    constructor(private router: Router, private store: Store<AppState>) {}

    ngOnInit() {
      const user = localStorage.getItem('user');
      if (user) {
        this.store.dispatch(AuthActions.login({ user: JSON.parse(user) }));
      }

      this.router.events.subscribe(event  => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.loading = true;
            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.loading = false;
            break;
          }
          default: {
            break;
          }
        }
      });

      this.isLoggedIn$ = this.store.select(isLoggedIn);
      this.isLoggedOut$ = this.store.select(isLoggedOut);
    }

    logout() {
      this.store.dispatch(logout());
    }

}
