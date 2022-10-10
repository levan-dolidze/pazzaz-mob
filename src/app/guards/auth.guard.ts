import { Injectable } from '@angular/core';
import {CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(): boolean {
    let isLoggedIn=localStorage.getItem('user');
    if(isLoggedIn){
      return false;
    }
    else{
      return true;
    }
  }
};
