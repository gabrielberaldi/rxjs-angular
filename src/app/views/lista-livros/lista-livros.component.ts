import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith, Subscription } from 'rxjs';
import { Book, Item } from 'src/app/models/interfaces';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnInit, OnDestroy{

  // search: FormControl = new FormControl('');
  search: string = '';
  books: Book[] = [];
  subscription: Subscription;

  livro: Book;

  constructor(
    private _livroService: LivroService
  ) { }

  ngOnInit(): void {
    // this.search.valueChanges.pipe(
    //   startWith(''),
    //   distinctUntilChanged(),
    //   debounceTime(300)
    // )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  searchBooks(): void {
    this.subscription = this._livroService.getLivros(this.search).subscribe({
      next: (items) => this.books = this._convertToBook(items),
      error: (erro: HttpErrorResponse) => console.error(erro),
      complete: () => console.log('completado')
    })
  }

  private _convertToBook(items: Item[]) {
    return items.map(item => ({
      title: item.volumeInfo?.title,
      authors: item.volumeInfo?.authors,
      publisher: item.volumeInfo?.publisher,
      publishedDate: item.volumeInfo?.publishedDate,
      description: item.volumeInfo?.description,
      previewLink: '', //TODO: VERIFICAR
      thumbnail: item.volumeInfo?.imageLinks?.thumbnail
    }))
  }

}



