import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interface/product';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdoctService {

  urlDatabase = "http://localhost:4201" // togliere products???

  constructor(private http: HttpClient) { }

// get all the data from db.json
  getProductList() {
    return this.http.get<Product[]>(`${this.urlDatabase}/products`).pipe(catchError(error => {
      return throwError(error); // da aggiungere gestione dell'errore (forse :D )
    }));
  };

// get the specific product from db.json
  getProduct(id: number) {
    return this.http.get<Product>(`${this.urlDatabase}/products/${id}`).pipe(catchError(error => {
      return throwError(error);// da aggiungere gestione dell'errore
    }));
  };


}
