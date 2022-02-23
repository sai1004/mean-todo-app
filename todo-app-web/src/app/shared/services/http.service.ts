import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Props } from '../utils/Props';
import { AppService } from './app.service';
import { ApexService } from './apex.service';

@Injectable()
export class HttpService {
  private host = Props.API_END_POINT;
  private altHost = Props.API_END_POINT;

  constructor(private http: HttpClient, private appService: AppService) {}

  get(url: string, loader?: boolean) {
    url = this.host + url;
    return this.http.get(url);
  }

  post(url: string, data: any, loader?: boolean) {
    url = this.host + url;
    return this.http.post(url, data);
  }

  put(url: string, data: any, loader?: boolean) {
    url = this.host + url;
    return this.http.put(url, data);
  }

  delete(url: string, loader?: boolean) {
    url = this.host + url;
    return this.http.delete(url);
  }

  patch(url: string, data: any, loader?: boolean) {
    url = this.host + url;
    return this.http.patch(url, data);
  }

  getById(url: string, Id: any, loader?: boolean) {
    url = this.host + url;
    return this.http.get(url + Id);
  }
}
