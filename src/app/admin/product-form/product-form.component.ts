import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/product.service';
import 'rxjs/add/operator/take';

import { ValidateUrl } from 'src/app/validators/url-validator';
import { ValidateAllFormFields } from 'src/app/validators/validate-form-fields';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  eForm: FormGroup;
  categories$;
  saving = false;
  productId = null;
  product;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
  ) {
    this.categoryService.getAll()
      .subscribe(response => {
        this.categories$ = response;
      });

    this.activatedRoute.params.subscribe(param => {
      this.productId = param.id;
      if (this.productId) {
        this.getProductById();
      } else {
        this.initForm();
      } 
    });
  }

  ngOnInit() {
    this.initForm();
  }

  getProductById() {
    this.productService.getById(this.productId)
      .valueChanges()
      .take(1)
      .subscribe(result => {
        this.product = result;
        // console.log(this.product);
        this.initForm();
      });
  }

  initForm() {
    this.eForm = this.formBuilder.group({
      title: [ this.product? this.product.title : '', [Validators.required]],
      price: [ this.product? this.product.price : '', [Validators.required, Validators.min(0)]],
      category: [ this.product? this.product.category : '', [Validators.required]],
      imageUrl: [ this.product? this.product.imageUrl : '', [Validators.required, ValidateUrl]],
    });
  }

  onSubmit() {
    if (this.eForm.invalid) {
      ValidateAllFormFields(this.eForm);
    } else {
      this.saving = true;

      const product = this.eForm.value;
      this.productService.create(product);

      setTimeout(() => {
        this.initForm();
        this.router.navigate(['/admin/products']);
      }, 900);
    }
  }

}
