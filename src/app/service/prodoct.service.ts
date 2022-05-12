import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interface/product';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdoctService {

  urlDatabase = "http://localhost:4201/products"

  constructor(private http: HttpClient) { }

// get all the data from db.json
  getProductList() {
    return this.http.get<Product[]>(this.urlDatabase).pipe(catchError(error => {
      return throwError(error); //aggiungere gestione dell'errore
    }));
  };

// get the specific product from db.json
  getProduct(id: number) {
    return this.http.get<Product>(`${this.urlDatabase}/${id}`).pipe(catchError(error => {
      return throwError(error);//aggiungere gestione dell'errore
    }));
  };


}
