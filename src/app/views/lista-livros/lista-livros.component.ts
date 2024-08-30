import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, Observable, startWith, Subscription, switchMap } from 'rxjs';
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
      map((items) => this.books = this._convertToBook(items))
    );
  }

  private _convertToBook(items: Item[]) {
    return items.map(item => new BookVolumeInfo(item));
  }

}



