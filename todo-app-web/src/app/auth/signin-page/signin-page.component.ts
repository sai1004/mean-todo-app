import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/models/Auth';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-signin-page',
    templateUrl: './signin-page.component.html',
    styleUrls: ['./signin-page.component.scss'],
})
export class SigninPageComponent implements OnInit {
    auth: Auth;
    hide: boolean = true;
    constructor(private _authService: AuthService) {
        this.auth = new Auth();
    }

    ngOnInit(): void {}

    onSubmit() {
        this.signinAuthenticate();
    }

    signinAuthenticate() {
        this._authService.sigin(this.auth).subscribe((response: any) => {
            if (response) {
                this._authService.saveUserToSession(response);
            }
        });
    }
}
