import { CategoryService } from './services/category.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './Models/User';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { Category } from './Models/Category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MyApp';
  user:User;
  signupForm:FormGroup;
  loginForm:FormGroup;
  submitted:boolean = false;
  categories:Category[];
  constructor(private userService: UserService,private router:Router,private categoryService:CategoryService){

  }
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data=>this.categories=data);
    this.signupForm=new FormGroup({
      username:new FormControl("",Validators.required),
      password:new FormControl("",Validators.required),
      fullName:new FormControl("",Validators.required),
      address:new FormControl("",Validators.required),
      role:new FormControl("user",Validators.required),
      image:new FormControl("",Validators.required),
      email:new FormControl("",Validators.required),
      phoneNumber:new FormControl("",Validators.required),


    })
   this.loginForm=new FormGroup({
    username:new FormControl("",Validators.required),
    password:new FormControl("",Validators.required),

   })
    this.userService.user.subscribe(user=>{
      this.user = user;
      if(user.role==="admin"){
        this.router.navigateByUrl("/mystore/manageProduct");

      }
    });

  }
  signUp(user: User){
    this.submitted=true;
    if(this.signupForm.valid){
      this.userService.signup(user).pipe(
        catchError(()=>{
          alert("Đăng ký không thành công");
          throw new Error("Đăng ký không thành công")
        })
      ).subscribe(data=>{
                if(data){
                  alert("Đăng ký thành công !");
                  this.signupForm=new FormGroup({
                    username:new FormControl("",Validators.required),
                    password:new FormControl("",Validators.required),
                    fullName:new FormControl("",Validators.required),
                    address:new FormControl("",Validators.required),
                    role:new FormControl("user",Validators.required),
                    image:new FormControl("",Validators.required),
                    email:new FormControl("",Validators.required),
                    phoneNumber:new FormControl("",Validators.required),


                  })
                }else{
                  alert("User Name này đã tồn tại");
                }

            }
        )

    }



  }
  login(user: any){
    this.submitted=true;
    if(this.loginForm.valid){
      this.userService.login(user).pipe(
        catchError(()=>{
          alert("Đăng nhập không thành công");
          throw new Error("Đăng nhập không thành công")
        })
      ).subscribe(data=>{
       if(data){
        alert("Đăng nhập thành công !");
       }else{
        alert("Đăng nhập không thành công");
       }

      }
        )

    }



  }
  logout(){
    this.userService.logout();
    this.router.navigateByUrl("/mystore");
  }
  findByCategoryID(categoryId:any){
    this.router.navigate(["/mystore"],{queryParams: {categoryId}})

  }

}
