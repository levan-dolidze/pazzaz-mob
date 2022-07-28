import { Injectable } from '@angular/core';
import {CanActivate } from '@angular/router';


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
