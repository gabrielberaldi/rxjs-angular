import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BooksResponse, Item } from '../models/interfaces';


@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly _url: string = 'https://www.googleapis.com/books/v1/volumes';

  constructor(
    private _http: HttpClient
  ) { }

  getLivros(value: string): Observable<Item[]> {
    return this._http.get<BooksResponse>(`${this._url}`, { params: { q: value } })
    .pipe(
      map((resultado) => resultado.items)
    )
  }
}
