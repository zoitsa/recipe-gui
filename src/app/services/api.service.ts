import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as bghttp from 'nativescript-background-http'; 
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';


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
    const session = bghttp.session('file-upload');
    const subject = new Subject<any>();

    const request = {
      url: `${this.apiURL}/recipe/${recipe.type}`,
      method: 'POST',
      headers: {
        "Content-Type": "application/octet-stream"
      },
      description: 'test'
    };

    // let body = new HttpParams();
    // body = body.set('name', recipe.name);
    // body = body.set('description', recipe.description);
    // body = body.set('ingredients', recipe.ingredients);
    // body = body.set('photo', recipe.photo);
    // console.log(body);
    // return this.http.post(`${this.apiURL}/recipe/1`, body);
     

    let task: bghttp.Task;
    const params = [
      { name: 'name', value: recipe.name },
      { name: 'description', value: recipe.description },

      // { name: 'ingredients', value: JSON.stringify(recipe.ingredients) },
      // { name: 'ingredients', value: recipe.ingredients },
      { name: 'photo', filename: recipe.photo, mimeType: 'image/png' }
    ];

    // for(let i in recipe.ingredients) {
    //   params.push({ name: 'ingredients', value: recipe.ingredients[i]});
    // }

    // for(let j in recipe.steps) {
    //   params.push({ name: 'steps', value: recipe.steps[j]});
    // }


    console.log(params);
    task = session.multipartUpload(params, request);
    task.on('responded', (event: any) => {
      if (event.data && event.data.error) {
        subject.error(event.data);
      } else {
        subject.next(event.data);
      }
    });
    task.on('error', (event) => subject.error(event));
    task.on('error', (e) =>console.log("received " + e.responseCode + " code."));
    return subject;
  }

}
