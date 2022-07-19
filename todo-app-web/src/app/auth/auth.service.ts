import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApexService } from '../shared/services/apex.service';
import { AppService } from '../shared/services/app.service';
import { HttpService } from '../shared/services/http.service';
import jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private auth_url: string = '/auth';

    constructor(
        private router: Router,
        private _http: HttpService,
        private _apexService: ApexService,
        private _appService: AppService
    ) {}

    sigin(data: any) {
        let user = {
            email: data.email,
            password: data.password,
        };
        return this._http.post(this.auth_url + '/signin', { data: user }, true);
    }

    signup(data: any) {
        return this._http.post(this.auth_url + '/signup', { data: data }, true);
    }

    saveUserToSession(data: any) {
        let user = data['identity'];
        if (user) {
            let token = data['access_token'];
            let decodeData = jwt_decode(token);
            console.log(decodeData);
            sessionStorage.setItem('sessionUser', JSON.stringify(user));
            sessionStorage.setItem('web-jwt-key', JSON.stringify(data['access_token']));
            this._apexService.updateSessionUser(JSON.stringify(user));
            this.router.navigateByUrl('/dashboard/dashboard');
            this._appService.showMessage('Signin Successful', false);
        }
    }

    signOut(): void {
        sessionStorage.clear();
        this._apexService.updateSessionUser(null);
        this.router.navigateByUrl('/auth/signin');
    }
}
