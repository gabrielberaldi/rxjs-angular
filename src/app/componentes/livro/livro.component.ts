import { Component, Input } from '@angular/core';
import { Book } from 'src/app/models/interfaces';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css']
})
export class LivroComponent {

  @Input() book!: Book;
  modalAberto: boolean;

  onModalChange(evento: boolean): void {
    this.modalAberto = evento;
  }
}
