import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/Models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  id:any;
  product:Product;
  constructor(private productService:ProductService,private route:ActivatedRoute){

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>this.id=params.get('id'))

    this.productService.getProduct(this.id).subscribe(
      data=>this.product=data
    )
  }


}
