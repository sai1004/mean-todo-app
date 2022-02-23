import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ApexService } from 'src/app/shared/services/apex.service';
import { TodoItem } from '../../models/TodoItem';
import { DashboardService } from '../dashboard.service';

@Component({
    selector: 'app-create-task-dialog',
    templateUrl: './create-task-dialog.component.html',
    styleUrls: ['./create-task-dialog.component.scss'],
})
export class CreateTaskDialogComponent implements OnInit, OnDestroy {
    todoItem: TodoItem;
    sessionUer$: Subscription = new Subscription();
    sessionUser: any;

    constructor(
        private _dashboardService: DashboardService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _apexService: ApexService
    ) {
        this.todoItem = new TodoItem();
    }

    ngOnInit(): void {
        this.getSessionUser();
        if (this.data) {
            this.loadTodoItem(this.data.id);
        }
    }

    onSubmit(): void {
        this.createTask(this.todoItem);
        if (!this.todoItem.id && this.todoItem.profileId) {
            this._dashboardService.updateTodoItem(this.todoItem);
        }
    }

    createTask(item: TodoItem): void {
        item.profileId = this.sessionUser.id;
        if (item.profileId) {
            this._dashboardService.saveTodoItem(item).subscribe((response: any) => {
                if (response) {
                }
            });
        }
    }

    loadTodoItem(id: any): void {
        this._dashboardService.getTodoItemtById(id).subscribe((response: any) => {
            if (response) {
                this.todoItem = response['data'];
            }
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
        this.sessionUer$.unsubscribe();
    }
}
