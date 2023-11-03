import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http:HttpClient) { }

  login(data:{}){

    return this.http.post(`http://localhost:3000/login`, data);
  }
}
