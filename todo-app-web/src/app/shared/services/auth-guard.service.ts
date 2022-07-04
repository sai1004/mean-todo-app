import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuardService {
    constructor(public router: Router, private _appService: AppService) {}

    canActivate(): boolean {
        if (!this.isAuthenticated()) {
            this.router.navigate(['auth/signin']);
            return false;
        }
        return true;
    }

    public isAuthenticated(): boolean {
        const token = this._appService.getJWT();
        return token && token != null && token != undefined;
    }
}
