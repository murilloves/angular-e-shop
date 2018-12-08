import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/product.service';

import { ValidateUrl } from 'src/app/validators/url-validator';
import { ValidateAllFormFields } from 'src/app/validators/validate-form-fields';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  categories$;
  eForm: FormGroup;
  saving = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
  ) {
    this.categoryService.getAll()
      .subscribe(response => {
        this.categories$ = response;
      });
  }

  ngOnInit() {
    this.initCleanForm();
  }

  initCleanForm() {
    this.eForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', [Validators.required]],
      imageUrl: ['', [Validators.required, ValidateUrl]],
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
        this.initCleanForm();
        this.router.navigate(['/admin/products']);
      }, 900);
    }
  }

}
