import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, catchError } from 'rxjs';
import { ApiResponse } from 'src/app/Models/ApiResponse';
import { Category } from 'src/app/Models/Category';
import { Product } from 'src/app/Models/Product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {
  apiResponse$:Observable<ApiResponse<Product>>;
  addForm:FormGroup;
  editForm:FormGroup;
  categories$:Observable<Category[]>;
  constructor(private productService: ProductService,private categoryService:CategoryService,private fb:FormBuilder){

  }
  ngOnInit(): void {
    this.categories$= this.categoryService.getCategories();
    this.apiResponse$=this.productService.getProducts();
    this.addForm=this.fb.group({

      productName:new FormControl("",Validators.required),
      price:new FormControl("",Validators.required),
      desc:new FormControl("",Validators.required),
      brand:new FormControl("",Validators.required),
      image:new FormControl("",Validators.required),

      category:this.fb.group({categoryId:"",categoryName:""}),
    });

    this.editForm=this.fb.group({
      productId:new FormControl("",Validators.required),
      productName:new FormControl("",Validators.required),
      price:new FormControl("",Validators.required),
      desc:new FormControl("",Validators.required),
      brand:new FormControl("",Validators.required),
      image:new FormControl("",Validators.required),

      category:this.fb.group({categoryId:"",categoryName:""}),
    });


  }
  handleChange(id:any){
    this.categories$.subscribe(categories=>{
      let cate=categories.find(x=>x.categoryId===(parseInt(id)));
      this.addForm.get("category").setValue({categoryId:cate.categoryId,categoryName:cate.categoryName});
    })


  }
  handlEditChange(id:any){
    this.categories$.subscribe(categories=>{
      let cate=categories.find(x=>x.categoryId===(parseInt(id)));
      this.editForm.get("category").setValue({categoryId:cate.categoryId,categoryName:cate.categoryName});
    })


  }
  addProduct(product:Product){
    if(this.addForm.valid){
      this.productService.addproduct(product).pipe(
        catchError(()=>{
          alert("Thêm không thành công!")
          throw new Error("Thêm không thành công!")
        })
      ).subscribe(data=>{
        alert("Thêm sản phẩm thành công!");
        this.apiResponse$=this.productService.getProducts();
      })
    }

  }
  goToPage(page:number){
    this.apiResponse$=this.productService.getProducts(page,6);
  }
  deleteProduct(productId:number){
    this.productService.deleteProduct(productId).pipe(
      catchError(()=>{
        alert("Xóa không thành công!")
        throw new Error("Xóa không thành công!")
      })
    ).subscribe(data=>{
      console.log(data);
      this.apiResponse$=this.productService.getProducts();
    })

  }
  passValueToForm(product:Product){
    this.editForm=this.fb.group({
      productId:new FormControl(product.productId,Validators.required),
      productName:new FormControl(product.productName,Validators.required),
      price:new FormControl(product.price,Validators.required),
      desc:new FormControl(product.desc,Validators.required),
      brand:new FormControl(product.brand,Validators.required),
      image:new FormControl(product.image,Validators.required),

      category:this.fb.group({categoryId:product.category.categoryId,categoryName:product.category.categoryName}),
    });

  }
  editProduct(product: Product){
    if(this.editForm.valid){
      this.productService.editproduct(product).pipe(
        catchError(()=>{
          alert("Sửa không thành công!")
          throw new Error("Sửa không thành công!")
        })
      ).subscribe(data=>{
        alert("Sửa sản phẩm thành công!");
        this.apiResponse$=this.productService.getProducts();
      })
    }


  }
  findByCateID(categoryId:any){
    this.apiResponse$=this.productService.getProductsByCategory(categoryId);
  }
  handleSearch(search:string){
    this.apiResponse$=this.productService.getProducts(0,6,search);

  }


}
