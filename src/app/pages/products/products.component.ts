import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { IProduct } from 'src/app/shared/interfaces/products.interfaces';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
// import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Array<IProduct> = [];

  constructor(private prService: ProductsService,
            private route: Router,
            private activatedRoute: ActivatedRoute) {
    this.route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.getProducts();

      }
    })
  }

  ngOnInit() {
    this.getProducts();
  }



  private getProducts(): void {
    const category = this.activatedRoute.snapshot.paramMap.get('category');
    this.prService.getJSONProducts().subscribe(
      data => {
        this.products = data.filter(pr => pr.categoryName === category);
      }
    );
  }
}
