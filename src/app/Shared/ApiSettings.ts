import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export default class ApiSettings{
  private defaultHeaders: { 'Content-Type': string; Acess: string; Authorization: string; };

  constructor() {
     this.defaultHeaders = {
      'Content-Type' : 'application/json',
      'Acess' : 'application/json',
      'Authorization' : 'Bearer ' + localStorage.getItem('token')
    }
  }

  get() {
    return { method: 'GET', headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }};
  }

  post(entity: Object) {
    return { method: 'POST', body: JSON.stringify(entity), headers: this.defaultHeaders };
  }

  put(entity: Object) {
    return { method: 'PUT', body: JSON.stringify(entity), headers: this.defaultHeaders };
  }

  delete() {
    return { method: 'DELETE', headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }};
  }
}


