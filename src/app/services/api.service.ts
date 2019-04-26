import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
      url: `${this.apiURL}/recipe/${recipe.type}`,
      method: 'POST',
      headers: {
        "Content-Type": "application/octet-stream"
      },
      description: 'new test'
    };

    // return this.http.post(`${this.apiURL}/recipe/${recipe.type}`, recipe);


    let task: bghttp.Task;
    const params = [
      { name: 'name', value: recipe.name },
      { name: 'description', value: recipe.description }, 
      ...recipe.ingredients.map(ing => { 
        return { name: 'ingredients', value: ing }
      }),
      ...recipe.steps.map(step => {
        return { name: 'steps', value: step }
      }),
      { name: 'photo', filename: recipe.photo, mimeType: 'image/png' }
    ];



    console.log(params);
    task = session.multipartUpload(params, request);
    task.on('responded', (event: any) => {
      if (event.data && event.data.error) {
        subject.error(event.data);
      } else {
        subject.next(event.data);
      }
    });

    task.on('error', (e) => console.log("received " + e.responseCode + " code."));
    
    return subject;
   
  }

}
