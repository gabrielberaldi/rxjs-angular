import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from 'src/app/models/interfaces';

const body = document.querySelector("body");

@Component({
  selector: 'app-modal-livro',
  templateUrl: './modal-livro.component.html',
  styleUrls: ['./modal-livro.component.css']
})
export class ModalLivroComponent {

  constructor() { }

  @Input() book: Book;
  @Output() mudouModal = new EventEmitter()
  statusModal: boolean = true;

  fecharModal(): void {
    this.statusModal = false
    this.mudouModal.emit(this.statusModal)
    body.style.overflow = "scroll"
  }

  esconderScroll(): void {
    if(this.statusModal == true ) {
      body.style.overflow = "hidden";
    }
  }
  
  lerPrevia(): void {
    window.open( '_blank');
  }

}
