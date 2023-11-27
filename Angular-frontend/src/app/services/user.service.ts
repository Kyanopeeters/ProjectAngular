import { Injectable, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, map, from, of, switchMap, catchError } from 'rxjs';
import * as jose from 'jose';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private authService: AuthService = inject(AuthService);

  constructor() { }

  whoIsLoggedIn(): Observable<string> {
    return from(this.authService.getAccessTokenSilently()).pipe(
      switchMap((token) => {
        try {
          const decodedToken = jose.decodeJwt(token) as { sub: string } | null;
          return of(decodedToken?.sub || '');
        } catch (error) {
          console.error('Error decoding token:', error);
          return of('');
        }
      }),
      catchError((error) => {
        console.error('Error getting access token:', error);
        return of('');
      })
    );
  }
}
