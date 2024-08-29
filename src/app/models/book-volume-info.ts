import { Book, Item } from "./interfaces";

export class BookVolumeInfo implements Book {
  
  readonly title?: string = "";
  readonly authors?: string[] = [];
  readonly publisher?: string = "";
  readonly publishedDate?: string = "";
  readonly description?: string = "";
  readonly previewLink?: string = "";
  readonly thumbnail?: string = "";

  constructor( { volumeInfo }: Item) {
    this.title = volumeInfo?.title;
    this.authors = volumeInfo?.authors;
    this.publisher = volumeInfo?.publisher;
    this.publishedDate = volumeInfo?.publishedDate;
    this.description = volumeInfo?.description;
    this.previewLink = ''; //TODO = VERIFICAR
    this.thumbnail = volumeInfo?.imageLinks?.thumbnail
  }

}