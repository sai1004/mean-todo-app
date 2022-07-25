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
    private refreshTokenTimeout: any;

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
            // this.startRefreshTokenTimer();
            this.router.navigateByUrl('/dashboard/dashboard');
            this._appService.showMessage('Signin Successful', false);
        }
    }

    // refreshToken() {
    //     return this.http.post<any>(`${environment.apiUrl}/users/refresh-token`, {}, { withCredentials: true })
    //         .pipe(map((user) => {
    //             this.userSubject.next(user);
    //             this.startRefreshTokenTimer();
    //             return user;
    //         }));
    // }

    // private startRefreshTokenTimer() {
    //     // parse json object from base64 encoded jwt token
    //     const jwtToken = JSON.parse(atob(this.userValue.jwtToken.split('.')[1]));

    //     // set a timeout to refresh the token a minute before it expires
    //     const expires = new Date(jwtToken.exp * 1000);
    //     const timeout = expires.getTime() - Date.now() - (60 * 1000);
    //     this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
    // }

    // private stopRefreshTokenTimer() {
    //     clearTimeout(this.refreshTokenTimeout);
    // }

    signOut(): void {
        sessionStorage.clear();
        this._apexService.updateSessionUser(null);
        // this.stopRefreshTokenTimer();
        this.router.navigateByUrl('/auth/signin');
    }
}
