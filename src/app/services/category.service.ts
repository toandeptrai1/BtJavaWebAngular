import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../Models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url:string = 'http://localhost:8080/api/v1/category';

  constructor(private http:HttpClient) {

  }
  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url)
  }
}
