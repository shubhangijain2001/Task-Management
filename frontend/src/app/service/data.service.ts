import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http:HttpClient) { }

  login(email: string, password: string){
    const requestBody = { email, password };
    return this.http.post(`http://localhost:3000/login`, requestBody);
  }
}
