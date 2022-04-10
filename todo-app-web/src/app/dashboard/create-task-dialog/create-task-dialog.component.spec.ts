import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TodoItem } from 'src/app/models/TodoItem';
import { AppService } from 'src/app/shared/services/app.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { CreateTaskDialogComponent } from './create-task-dialog.component';

fdescribe('CreateTaskDialogComponent', () => {
    let component: CreateTaskDialogComponent;
    let fixture: ComponentFixture<CreateTaskDialogComponent>;

    beforeEach(async () => {
        let todoItem: TodoItem = new TodoItem();

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
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateTaskDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create CreateTaskDialogComponent', () => {
        expect(component).toBeTruthy();
    });

    it('should call ngOninit Method', () => {
        let ngOninit = spyOn(component, 'ngOnInit');
        let sessionUser = spyOn(component, 'getSessionUser');
        component.ngOnInit();
        component.getSessionUser();
        expect(ngOninit).toHaveBeenCalled();
        expect(sessionUser).toHaveBeenCalled();
    });

    it('should call onSubmit Method', () => {
        let todoItem = {
            id: '',
            title: '',
            description: '',
            status: 'active',
            profileId: '',
        };
        let onSubmit = spyOn(component, 'onSubmit');
        let createTask = spyOn(component, 'createTask');
        component.onSubmit();
        component.createTask(todoItem);
        expect(onSubmit).toHaveBeenCalled();
        expect(createTask).toHaveBeenCalled();
    });
});
