import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      // exhaustMap resuelve un observable y una vez terminado empieza otro
      exhaustMap((user) => {
        // Al logearse todavia no existe user, asi que tenemos que hacer la req sin params
        if (!user) {
          return next.handle(req);
        }
        // Una vez existe user, las peticiones las hacemos mandando el token como params
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
