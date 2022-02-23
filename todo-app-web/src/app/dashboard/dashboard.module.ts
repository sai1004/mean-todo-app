import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { CreateTaskDialogComponent } from './create-task-dialog/create-task-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'dashboard', component: DashboardComponent }];

@NgModule({
    declarations: [DashboardComponent, TasksListComponent, CreateTaskDialogComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
    providers: [],
})
export class DashboardModule {}
