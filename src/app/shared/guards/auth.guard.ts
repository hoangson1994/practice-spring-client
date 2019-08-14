import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd';
import { ACCESS_TOKEN_SECRET_KEY, BASE_URL } from '../resources/static.resource';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private http: HttpClient,
    private router: Router,
    private notify: NzNotificationService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin(state.url);
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(next, state);
  }

  private async checkLogin(url: string): Promise<boolean> {
    const token = localStorage.getItem(ACCESS_TOKEN_SECRET_KEY);
    if (!token) {
      this.redirectToLoginAndNotify();
      return false;
    }

    try {
      const user = await this.http.get(`${BASE_URL}v1/users`).toPromise();
      console.log(user);
      return true;
    } catch (e) {
      localStorage.removeItem(ACCESS_TOKEN_SECRET_KEY);
      this.redirectToLoginAndNotify();
      return false;
    }
  }

  private redirectToLoginAndNotify() {
    this.router.navigateByUrl('/login');
    this.notify.create('warning', 'Bạn chưa đăng nhập', 'Hãy đăng nhập trước khi sử dụng bất cứ tính năng nào');
  }
}
