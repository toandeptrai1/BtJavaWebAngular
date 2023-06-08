import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/Models/ApiResponse';
import { Product } from 'src/app/Models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  apiResponse$:Observable<ApiResponse<Product>>;
  constructor(private productService: ProductService,private router:Router,private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const value = params['categoryId'];
      if(value){
        this.apiResponse$=this.productService.getProductsByCategory(value);
      }else{
        this.apiResponse$=this.productService.getProducts();
      }
    });

  }
  goToPage(page:number){
    this.apiResponse$=this.productService.getProducts();
  }
  navigateToProDetail(id:number){
    this.router.navigateByUrl(`/mystore/productDetail/${id}`)

  }



}
