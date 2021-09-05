import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  NavigationEnd,
  CanActivateChild,
  CanLoad,
  Route,
  UrlSegment,
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from './shared/service/auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuardService
  implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {});
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return true;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (
      this.authService.isLoggedIn() === true &&
      childRoute.pathFromRoot.toString() == ''
    ) {
      this.router.navigateByUrl('/dashboard');
    } else if (this.authService.isLoggedIn() === true) {
      return true;
    } else {
      this.router.navigateByUrl('/auth/login');
      return false;
    }
  }
  canLoad(route: Route, segments: UrlSegment[]): boolean {
    if (this.authService.isLoggedIn() === true && route.path == '') {
      this.router.navigateByUrl('/dashboard');
    } else if (this.authService.isLoggedIn() === true) {
      return true;
    } else {
      this.router.navigateByUrl('/auth/login');
      return false;
    }
  }
}
