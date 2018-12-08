import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  products;
  filteredProducts: any[];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    // this.products = this.productService.getAll();
    this.subscription = this.productService.getAll()
      .subscribe(products => this.filteredProducts = this.products = products);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    this.filteredProducts = (query)
      ? this.products.filter(product => product.title.toLowerCase().includes(query.toLocaleLowerCase()))
      : this.products;
  }

}
