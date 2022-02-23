import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApexService } from '../shared/services/apex.service';
import { HttpService } from '../shared/services/http.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private auth_url: string = '/auth';

    constructor(private _http: HttpService, private _apexService: ApexService, private router: Router) {}

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
            sessionStorage.setItem('sessionUser', JSON.stringify(user));
            sessionStorage.setItem('web-jwt-key', JSON.stringify(data['access_token']));
            this._apexService.updateSessionUser(JSON.stringify(user));
            this.router.navigateByUrl('/dashboard/dashboard');
        }
    }
}
