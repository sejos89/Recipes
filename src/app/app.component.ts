import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Store } from '@ngrx/store';
import { LoggingService } from './logging.service';
import * as AuthActions from './auth/store/auth.actions';
import * as fromApp from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<fromApp.AppState>,
    private loggingService: LoggingService,
    @Inject(PLATFORM_ID) private platformId
  ) {}

  ngOnInit(): void {
    // we want to dispatch autoLogin only when the code is already running on the browser and not in the server
    // we do this because autoLogin relies on local storage, which is not available on the server
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(AuthActions.autoLogin());
    }
    this.loggingService.printLog('Hello from Appcomponent ngOnInit');
  }
}
