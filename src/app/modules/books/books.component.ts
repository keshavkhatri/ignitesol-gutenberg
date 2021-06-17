import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BookCategory } from '../../common/models/bookCategory'
import { BooksService } from './services/books.service';

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class BooksComponent implements OnInit {

    public categories: Array<BookCategory>;

    constructor(
        public booksService: BooksService,
    ) { }

    ngOnInit() {
        this.getCategories();
    }

    /**
     * Sets categories
     * @param null
     * @returns null
     */
    getCategories() {
        this.booksService.getCategories().then((categories:Array<BookCategory>) =>{
            this.categories = categories;
        })
    }

}
