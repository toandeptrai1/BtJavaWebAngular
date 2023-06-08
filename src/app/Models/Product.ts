import { Category } from "./Category";

export interface Product{
   productId:number;
  productName:string;
  price:number;
  desc:string;
  brand:string;
  image:string;
  category:Category;
  
}
