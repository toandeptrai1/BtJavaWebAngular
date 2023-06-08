import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductComponent } from './Product/list-product/list-product.component';
import { ProfileComponent } from './profile/profile.component';
import { ManageProductComponent } from './Product/manage-product/manage-product.component';
import { ProductDetailComponent } from './Product/product-detail/product-detail.component';


const routes: Routes = [
  {path:'mystore/profile',component:ProfileComponent},
  {path:'mystore/productDetail/:id',component:ProductDetailComponent},
   {path:'mystore/productDetail',redirectTo: '/mystore', pathMatch: 'full'},
  {path:'mystore',component:ListProductComponent},
  {path:'mystore/manageProduct',component:ManageProductComponent},
  { path: '', redirectTo: '/mystore', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
