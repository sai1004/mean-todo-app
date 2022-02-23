import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { delay, finalize, tap } from 'rxjs/operators';
import { AppService } from './app.service';
// import { Props } from '../utils/props';
import { ApexService } from './apex.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    CONTENT_TYPE: string = 'application/json; charset=utf-8';

    constructor(private appSerivce: AppService, private _apexService: ApexService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                'Content-Type': this.CONTENT_TYPE,
                Authorization: `JWT ${this.appSerivce.getJWT()}`,
            },
        });

        const started = Date.now();
        let ok: string;

        this._apexService.showLoader(true);
        return next.handle(request).pipe(
            tap(
                /* ----------> Success Responeses <---------- */
                (event: HttpEvent<any>) => (ok = event instanceof HttpResponse ? 'succeeded' : ''),

                /* ----------> Error Responeses <---------- */
                (error: HttpErrorResponse) => (
                    (ok = 'failed'), this.errorMessage(error.error), console.log('error', error.error['error'])
                )
            ),
            delay(10),
            // Log when response observable either completes or errors
            finalize(() => {
                this._apexService.showLoader(false);
                const elapsed = Date.now() - started;
                const msg = `${request.method} "${request.urlWithParams}" ${ok} in ${elapsed} ms.`;
                // console.log(msg);
            })
        );
    }

    errorMessage(err: any) {
        let message = err.message ? err.message : err['error'];
        this.appSerivce.showMessage(message, true);
    }
}
