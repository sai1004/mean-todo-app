import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TodoItem } from 'src/app/models/TodoItem';
import { AppService } from 'src/app/shared/services/app.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardService } from '../dashboard.service';

import { CreateTaskDialogComponent } from './create-task-dialog.component';

fdescribe('CreateTaskDialogComponent', () => {
    let component: CreateTaskDialogComponent;
    let fixture: ComponentFixture<CreateTaskDialogComponent>;
    let dashboardService: DashboardService;
    let _dashboardServiceSpy: any;
    let todoitem = {
        id: '21312SDFDSDF3123',
        title: 'hello',
        description: 'hi',
        status: 'active',
        profileId: '23123LJLK',
    };

    beforeEach(async () => {
        let todoItem: TodoItem = new TodoItem();

        _dashboardServiceSpy = jasmine.createSpyObj(DashboardService, [
            'getTodoItemtById',
            'saveTodoItem',
            'updateTodoItem',
        ]);
        _dashboardServiceSpy.saveTodoItem.and.returnValue(of({ data: todoitem }));
        _dashboardServiceSpy.getTodoItemtById.and.returnValue(of({ data: todoitem }));
        _dashboardServiceSpy.updateTodoItem.and.returnValue(of({ data: todoitem }));

        await TestBed.configureTestingModule({
            declarations: [CreateTaskDialogComponent],
            imports: [BrowserAnimationsModule, SharedModule, HttpClientTestingModule, RouterTestingModule],
            providers: [
                HttpService,
                AppService,
                { provide: MatDialogRef, useValue: {} },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {}, // Add any data you wish to test if it is passed/used correctly
                },
                { provide: DashboardService, useValue: _dashboardServiceSpy },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateTaskDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        dashboardService = TestBed.inject(DashboardService);
    });

    it('should create CreateTaskDialogComponent', () => {
        expect(component).toBeTruthy();
    });

    it('should call ngOninit() Method', () => {
        let ngOninit = spyOn(component, 'ngOnInit');
        let sessionUser = spyOn(component, 'getSessionUser');
        component.ngOnInit();
        component.getSessionUser();
        expect(ngOninit).toHaveBeenCalled();
        expect(sessionUser).toHaveBeenCalled();
    });

    it('should call onSubmit() Method', () => {
        let createTask = spyOn(component, 'createTask');
        component.onSubmit();
        component.createTask(todoitem);
        expect(createTask).toHaveBeenCalled();
    });

    it('should call loadTodoItem() Method', () => {
        component.loadTodoItem('21312SDFDSDF3123');
        expect(_dashboardServiceSpy.getTodoItemtById).toHaveBeenCalled();
    });
});
