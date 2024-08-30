import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, filter, map, Observable, startWith, Subscription, switchMap, tap, throwError } from 'rxjs';
import { BookVolumeInfo } from 'src/app/models/book-volume-info';
import { Book, Item } from 'src/app/models/interfaces';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnInit {

  search: FormControl = new FormControl('');
  books: Book[] = [];
  filteredBooks$: Observable<Book[]>;
  total: number;
  errorMessage: string = "";

  private readonly _time: number = 300;

  constructor(
    private _livroService: LivroService
  ) { }

  ngOnInit(): void {
    this.filteredBooks$ = this.search.valueChanges.pipe(
      debounceTime(this._time),
      filter((value) => value.length >= 3),
      distinctUntilChanged(),
      switchMap((value) => this._livroService.getLivros(value)),
      map((result) => result.items ?? []),
      map((items) => {
        this.total = items.length;
        return this.books = this._convertToBook(items)
      }),
      catchError(() => {
        return throwError(() => new Error(this.errorMessage = 'Ocorreu um erro, tente novamente !'))
      })
    );
  }

  private _convertToBook(items: Item[]) {
    return items.map(item => new BookVolumeInfo(item));
  }

}



