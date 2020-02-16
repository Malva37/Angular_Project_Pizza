import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/interfaces/products.interfaces';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  view: IProduct;
  constructor(private prService: ProductsService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.prService.getOneProduct(id).subscribe(
      data => {
        this.view = data;
      })

  }
  back(): void {
    this.location.back();
  }

}
