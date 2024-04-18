import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from './_model/Product.model';
import { Observable, map, of } from 'rxjs';
import { ProductService } from './_services/product.service';
import { ImageProcessingService } from './image-processing.service';


@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<Product> {

  constructor(private productService :ProductService,
    private imageProcessingService:ImageProcessingService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):any/*Observable<Product>*/ {
    const id=route.paramMap.get("productId");

    if(id){
      this.productService.getProductDetailsById(id)
      .pipe(
        map(p=>this.imageProcessingService.createImages(p))
      )
    }else{
      return of(this.getProductDetails())//16:40
    }
  }















getProductDetails(){
  return{
    productName: "",
    productDescription: "",
    productDiscountedPrice: 0,
    productActualPrice: 0,
    productImages: []
  }
}


}
