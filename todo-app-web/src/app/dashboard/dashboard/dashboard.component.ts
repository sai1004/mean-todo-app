import { Component, OnInit } from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';
import { ApexService } from 'src/app/shared/services/apex.service';
import { DashboardService } from '../dashboard.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    sessionUser: any = '';
    todoList: any[] = [].sort();
    todolist$: Subscription = new Subscription();
    sessionUer$: Subscription = new Subscription();

    constructor(private _dashboardService: DashboardService, private _apexService: ApexService) {}

    ngOnInit(): void {
        this.getSessionUser();
        this.loadTodoList();
        this.addTodoItem();
    }

    loadTodoList(): void {
        if (this.sessionUser.id) {
            this._dashboardService.getTodoList(this.sessionUser.id).subscribe((response: any) => {
                if (response) {
                    this.todoList = response['data'];
                }
            });
        }
    }

    addTodoItem(): void {
        this.todolist$ = this._dashboardService.getTodoItem.subscribe((item: any) => {
            this.todoList.unshift(item);
        });
    }

    getSessionUser(): void {
        this.sessionUer$ = this._apexService.sessionUser.subscribe((response: any) => {
            if (response) {
                this.sessionUser = JSON.parse(response);
            }
        });
    }

    ngOnDestroy(): void {
        this.todolist$.unsubscribe();
        this.sessionUer$.unsubscribe();
    }
}
