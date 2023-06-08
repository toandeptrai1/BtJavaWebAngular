import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../Models/Product';
import { ApiResponse } from '../Models/ApiResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url:string = 'http://localhost:8080/api/v1/products';



  constructor(private http:HttpClient) {

   }
   public getProducts(page:number=0,size:number=6,productName:string=""):Observable<ApiResponse<Product>> {
    return this.http.post<ApiResponse<Product>>(this.url,{page,size,productName});
   }
   public getProductsByCategory(categoryId:number,page:number=0,size:number=6):Observable<ApiResponse<Product>> {
    return this.http.post<ApiResponse<Product>>(`${this.url}/getByCategory`,{categoryId,page,size});
   }
   public getProduct(productId:number):Observable<Product> {
    return this.http.get<Product>(`${this.url}/${productId}`);
   }
   public addproduct(product:Product):Observable<Product> {
    return this.http.post<Product>(`${this.url}/add`,product);
   }
   public editproduct(product:Product):Observable<Product> {
    return this.http.post<Product>(`${this.url}/edit`,product);
   }
   public deleteProduct(productId:number):Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/delete/${productId}`)

   }
}
