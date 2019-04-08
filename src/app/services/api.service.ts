import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as bghttp from 'nativescript-background-http'; 
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiURL = 'https://recipe-server.now.sh';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.apiURL}/category`, {
      // headers: new HttpHeaders().set('Authorization', this.appAuth)
    });
  }

  getRecipesFromSubCategory(subCategoryId: number) {
    return this.http.get(`${this.apiURL}/subCategory/${subCategoryId}`, {
    });
  }

  postRecipe(recipe) {
    const session = bghttp.session('image-upload');
    const subject = new Subject<any>();

    const request = {
      url: `${this.apiURL}/recipe/4`,
      method: 'POST',
      description: 'test'
    };

    let task: bghttp.Task;
    const params = [
      { name: 'name', value: recipe.name },
      { name: 'description', value: recipe.description },
      { name: 'photo', filename: recipe.photo, mimeType: 'image/png' },
      { name: 'ingredients', value: recipe.ingredients },
      { name: 'steps', value: recipe.steps },
      { name: 'tag', value: recipe.tag }
    ];

    task = session.multipartUpload(params, request);
    task.on('responded', (event: any) => {
      if (event.data && event.data.error) {
        subject.error(event.data);
      } else {
        subject.next(event.data);
      }
    });
    task.on('error', (event) => subject.error(event));

    return subject;
  }

}
