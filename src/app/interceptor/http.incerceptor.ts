//httpConfig.interceptor.ts
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(public toastController: ToastController) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error) {
          this.presentToast(error.message)
        } else {
          return throwError(error.error)
        }
      })
     )
  };

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2500,
      icon: 'information-circle',
      color:'danger'
    });
    toast.present();
  };
};

