import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninPageComponent } from './signin-page/signin-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { ForgotpasswordPageComponent } from './forgotpassword-page/forgotpassword-page.component';
import { ResetpasswordPageComponent } from './resetpassword-page/resetpassword-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
    { path: 'signin', component: SigninPageComponent },
    { path: 'signup', component: SignupPageComponent },
    { path: 'reset', component: ResetpasswordPageComponent },
    { path: 'forgot', component: ForgotpasswordPageComponent },
];

@NgModule({
    declarations: [SigninPageComponent, SignupPageComponent, ForgotpasswordPageComponent, ResetpasswordPageComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class AuthModule {}
