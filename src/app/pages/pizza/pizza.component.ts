import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { IProduct } from 'src/app/shared/interfaces/products.interfaces';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss']
})
export class PizzaComponent implements OnInit {
products:Array<IProduct> =[];

  constructor(private prService:ProductsService) { }

  ngOnInit() {
    this.getProducts();
  }


  
  private getProducts(): void {
    this.prService.getJSONProducts().subscribe(
      data => {
        this.products = data;
      }
    );
  }

}
