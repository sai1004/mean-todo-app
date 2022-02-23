import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TodoItem } from '../models/TodoItem';
import { HttpService } from '../shared/services/http.service';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    private todo_url: string = '/todo';
    private _todoListSubject: Subject<any> = new Subject();

    constructor(private _http: HttpService) {}

    getTodoList(id: any) {
        return this._http.get(this.todo_url + `/list?profileId=${id}`, true);
    }

    getTodoItemtById(id: any) {
        return this._http.get(this.todo_url + `/item?id=${id}`, true);
    }

    saveTodoItem(item: TodoItem) {
        return this._http.post(this.todo_url + '/save', { data: item }, true);
    }

    get getTodoItem(): Observable<any> {
        return this._todoListSubject.asObservable();
    }

    updateTodoItem(item: any): void {
        this._todoListSubject.next(item);
    }
}
