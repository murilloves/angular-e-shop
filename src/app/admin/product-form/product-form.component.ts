import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  categories$;
  eForm: FormGroup;

  constructor(
    categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private productService: ProductService,
  ) {
    categoryService.getCategories()
      .subscribe(response => {
        this.categories$ = response;
      });
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.eForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]]
    });
  }

  onSubmit() {
    const product = this.eForm.value;
    this.productService.create(product);
  }

}
