import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiURL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.apiURL}/category`, {
      // headers: new HttpHeaders().set('Authorization', this.appAuth)
    });
  }


}
