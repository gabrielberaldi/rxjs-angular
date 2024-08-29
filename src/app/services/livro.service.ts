import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly _url: string = 'https://www.googleapis.com/books/v1/volumes';

  constructor(
    private _http: HttpClient
  ) { }

  getLivros(value: string): Observable<any> {
    return this._http.get<any>(`${this._url}`, { params: { q: value } });
  }
}
