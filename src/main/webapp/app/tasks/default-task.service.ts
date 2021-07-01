import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BASE_URL } from '../app.tokens';
import {Task, TaskStatus} from './task';
import { TaskService } from './task.service';

@Injectable()
export class DefaultTaskService implements TaskService {

  constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl: string) {
  }

  create(name: string): Observable<Task> {
    return this.http.post<Task>(this.baseUrl + '/tasks', {name} as Task);
  }

  delete(id: string): Observable<null> {
    return this.http.delete<null>(this.baseUrl + '/tasks/' + id);
  }

  deleteAll(ids: string[]): Observable<null> {
    return this.http.delete<null>(this.baseUrl + '/tasks', {params: {id: ids}});
  }


  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + '/tasks');
  }

  setStatus(id: string, status: TaskStatus): Observable<Task> {
    return this.http.put<Task>(this.baseUrl + '/tasks/' + id + '/status', { status });
  }
}
