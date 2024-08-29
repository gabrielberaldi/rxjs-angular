import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith, Subscription } from 'rxjs';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnInit, OnDestroy{

  // search: FormControl = new FormControl('');
  search: string = '';
  listaLivros: [];
  subscription: Subscription;

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

  buscarLivros(): void {
    this.subscription = this._livroService.getLivros(this.search).subscribe({
      next: (retorno) => console.log(retorno),
      error: (erro: HttpErrorResponse) => console.error(erro),
      complete: () => console.log('completado')
    })
  }

}



