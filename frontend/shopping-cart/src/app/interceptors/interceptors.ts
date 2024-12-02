import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { PopupService } from "../services/popup.service";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const popupServ = inject(PopupService);
    return next(req).pipe(catchError(err => {
        popupServ.openSnackBar('Unexcepted error !!')
        console.error('[http request error]: ', err);
        return throwError(() => err);
    }));
}


export function logInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const originHeaders = req.headers;
    req = req.clone({
        setHeaders: {
            'Content-Type': originHeaders.has('Content-Type') ? originHeaders.get('Content-Type')! : 'application/json'
        }
    });   
    return next(req);
}