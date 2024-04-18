import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/Product.model';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_services/product.service';
import { response } from 'express';
import { error } from 'console';
import { Http2ServerResponse } from 'http2';
import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../_model/file-handle.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrl: './add-new-product.component.css'
})
export class AddNewProductComponent implements OnInit {

  product: Product = {
    productName: "",
    productDescription: "",
    productDiscountedPrice: 0,
    productActualPrice: 0,
    productImages: []
  }
  constructor(private productService: ProductService,
    private sanitizer: DomSanitizer,
    private activatedRoute:ActivatedRoute) { }


  ngOnInit(): void {
this.product =this.activatedRoute.snapshot.data['product']//product li mawjouda fi resolve: fi app-routing
  }

  addProduct(productForm: NgForm) {
    const productFormData=this.prepareFormData(this.product);
    this.productService.addProduct(productFormData).subscribe(
      (response: Product) => {
        productForm.reset();
        this.product.productImages=[];
        console.log(response);
      }, (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  prepareFormData(product: Product): FormData {
    const formData = new FormData();
    formData.append(
      'product',
      new Blob([JSON.stringify(product)], { type: 'application/json' })
    );

    for (var i = 0; i < product.productImages.length; i++) {
      formData.append(
        'imageFile',
        product.productImages[i].file,
        product.productImages[i].file.name
      );

    }
    return formData;
  }

  onFileSelected(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
      this.product.productImages.push(fileHandle);
    }
  }

  removeImages(i:number){
    this.product.productImages.splice(i,1);
  }

  fileDropped(fileHandle:FileHandle){
    this.product.productImages.push(fileHandle)
  }
}

