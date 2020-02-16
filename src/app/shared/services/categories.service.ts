import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from '../interfaces/categories.interfaces';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/categories';
  }


  getJSONCategories(): Observable<Array<ICategory>> {
    return this.http.get<Array<ICategory>>(this.url);
  }
  postJSONCategories(category: ICategory): Observable<Array<ICategory>> {
    return this.http.post<Array<ICategory>>(this.url, category);
  }

  updateJSONCategories(category: ICategory): Observable<Array<ICategory>> {
    return this.http.put<Array<ICategory>>(`${this.url}/${category.id}`, category);
  }

  deleteJSONCategories(id: number): Observable<Array<ICategory>> {
    return this.http.delete<Array<ICategory>>(`${this.url}/${id}`);
  }






}
