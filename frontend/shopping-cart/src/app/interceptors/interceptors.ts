import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { PopupService } from "../services/popup.service";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

export function logInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const popupServ = inject(PopupService);
    const router = inject(Router)
    return next(req).pipe(catchError(err => {
        popupServ.openSnackBar('Unexcepted error !!')
        console.error('[http request error]: ', err);
        if (err.status === 401 || err.error.message === 'Failed to fetch') {
            router.navigate(['/login']);
        }
        return throwError(() => err);
    }));
}


export function setHeaderInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const originHeaders = req.headers;
    req = req.clone({
        setHeaders: {
            'Content-Type': originHeaders.has('Content-Type') ? originHeaders.get('Content-Type')! : 'application/json',
        }
    });
    const authServ = inject(AuthService);
    const token = authServ.user?.jwtToken;
    if (token) {
        req = req.clone({
            setHeaders: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
    return next(req);
}