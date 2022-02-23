import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CreateTaskDialogComponent } from './dashboard/create-task-dialog/create-task-dialog.component';
import { ApexService } from './shared/services/apex.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    isSessionUser: boolean = false;
    sessionUser$: Subscription = new Subscription();
    user: any;

    constructor(public dialog: MatDialog, private router: Router, private _apexService: ApexService) {}

    ngOnInit() {
        this.getSessionUser();
    }

    openDialog() {
        this.dialog.open(CreateTaskDialogComponent);
    }

    getSessionUser(): void {
        this.sessionUser$ = this._apexService.sessionUser.subscribe((user: any) => {
            if (user) {
                this.isSessionUser = true;
            }
        });
    }

    onLogout(): void {
        this.isSessionUser = false;
        sessionStorage.clear();
        this.router.navigateByUrl('/auth/signin');
    }

    ngOnDestroy(): void {
        this.sessionUser$.unsubscribe();
    }
}
