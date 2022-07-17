import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsUserLoggedInGuard implements CanActivate {
  canActivate(): boolean {
    let isLoggedIn=localStorage.getItem('user');
    if(isLoggedIn){
      return true;
    }
    else{
      return false;
    }
  }
  
}
