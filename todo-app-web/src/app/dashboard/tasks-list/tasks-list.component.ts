import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from '../create-task-dialog/create-task-dialog.component';

@Component({
    selector: 'app-tasks-list',
    templateUrl: './tasks-list.component.html',
    styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements OnInit {
    @Input()
    todoList: any[] = [];

    @Input()
    type: any;

    constructor(public dialog: MatDialog) {}

    ngOnInit(): void {}

    openDialog(index: any) {
        this.dialog.open(CreateTaskDialogComponent, { data: { id: this.todoList[index].id } });
    }

    onStatusComplete(index: number) {
        this.todoList[index].status = 'completed';
        console.log(this.todoList[index].status);
    }
}
