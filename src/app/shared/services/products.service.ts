import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/products.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  data: string = 'Data from service';

  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/products';
   }

   getJSONProducts(): Observable<Array<IProduct>> {
     return this.http.get<Array<IProduct>>(this.url);
   }

   getOneProduct(id :number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.url}/${id}`);
  }

   postJSONProducts(product: IProduct): Observable<Array<IProduct>> {
    return this.http.post<Array<IProduct>>(this.url, product);
   }


   updateJSONProducts(product: IProduct): Observable<Array<IProduct>> {
    return this.http.put<Array<IProduct>>(`${this.url}/${product.id}`, product);
  }

   deleteJSONProducts(id: number): Observable<Array<IProduct>> {
     return this.http.delete<Array<IProduct>>(`${this.url}/${id}`);
   }









  getData(): string {
    return this.data;
  }
}
