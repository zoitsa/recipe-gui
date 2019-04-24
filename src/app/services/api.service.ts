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
  // private apiURL = 'http://localhost:1337';

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
    const recipeType = recipe.type;
    delete recipe.type;
    // const updatedRecipe = {
    //     'name': recipe.name,
    //     'description': recipe.description,
    //     'ingredients': '',
    // }
    // updatedRecipe.ingredients
    // const session = bghttp.session('file-upload');
    // const subject = new Subject<any>();

    // const request = {
    //   url: `${this.apiURL}/recipe/${recipe.type}`,
    //   method: 'POST',
    //   headers: {
    //     "Content-Type": "application/octet-stream"
    //   },
    //   description: 'test'
    // };

    // let body = new HttpParams();
    // body = body.set('name', recipe.name);
    // body = body.set('description', recipe.description);
    // body = body.set('ingredients', recipe.ingredients);
    // body = body.set('steps', recipe.steps);
    // body = body.set('photo', recipe.photo);
    // console.log(body);

    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-type': 'application/x-www-form-urlencoded'
    //   })
    // }

    return this.http.post(`${this.apiURL}/recipe/${recipeType}`, recipe);

    // recipe.ingredients.map(v => { name: 'ingredients', value: v})

    // let task: bghttp.Task;
    // const params = [
    //   { name: 'name', value: recipe.name },
    //   { name: 'description', value: recipe.description },
    //   { name: 'photo', filename: recipe.photo, mimeType: 'image/png' },
    //   ...recipe.ingredients.map(ing => { 
    //     return { name: 'ingredients', value: ing }
    //   }),
    //   ...recipe.steps.map(step => {
    //     return { name: 'steps', value: step }
    //   }),
    //   { name: 'ingredients', value: JSON.stringify(recipe.ingredients) },
    //   { name: 'steps', value: JSON.stringify(recipe.steps)}
    // ];


    // for(let i in recipe.ingredients) {
    //   if (recipe.ingredients.length === 1) {
    //     params.push({ name: 'ingredients', value: recipe.ingredients[i].split()});
    //   } else {
    //     params.push({ name: 'ingredients', value: recipe.ingredients[i]});
    //   }
    //   params.push({ name: 'ingredients', value: recipe.ingredients[i]});
    // }

    // for(let j in recipe.steps) {
    //   if (recipe.steps.length === 1) {
    //     params.push({ name: 'steps', value: recipe.steps});
    //   }
    //   else {
    //     params.push({ name: 'steps', value: recipe.steps[j]});
    //   }
    //   params.push({ name: 'steps', value: recipe.steps[j]});
    // }


    // console.log(params);
    // task = session.multipartUpload(params, request);
    // task.on('responded', (event: any) => {
    //   if (event.data && event.data.error) {
    //     subject.error(event.data);
    //   } else {
    //     subject.next(event.data);
    //   }
    // });
    // // task.on('error', (event) => subject.error(event));
    // task.on('error', (e) => console.log("received " + e.responseCode + " code."));
    
    // return subject;
   
  }

}
