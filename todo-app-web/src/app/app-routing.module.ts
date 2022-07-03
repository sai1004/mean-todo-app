import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './shared/services/auth-guard.service';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'auth/signin' },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
        // canActivate: [LoggedInAuthGuard],
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        canActivate: [AuthGuardService],
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: true,
            preloadingStrategy: PreloadAllModules,
            scrollPositionRestoration: 'enabled',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
