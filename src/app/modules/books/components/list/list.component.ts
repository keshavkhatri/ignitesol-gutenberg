import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BookCategory } from '../../../../common/models/bookCategory';
import { BooksService } from '../../services/books.service';
import { LoadingService } from '../../../../common/services/loading.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit {

    public category: BookCategory;
    public searchQuery: string;
    public books: Array<object> = [];
    public searchQuerySubject: Subject<string> = new Subject<string>();
    public next:string = null;
    public scollActivated:boolean = false;

    constructor(
        private route: ActivatedRoute,
        private booksService: BooksService,
        public loadingService: LoadingService,
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if(params.category){
                this.booksService.getCategories(params.category).then(categories => {
                    this.category = categories[0];
                    this.getBooks();
                })
            }else{
                this.getBooks();
            }
        });
        this.subscribeSearchSubject();
    }

    /**
     * To fetch Books from api
     * @param none
     * @returns none
     */
    getBooks() {
        this.loadingService.showLoading();
        this.scollActivated = true;
        this.booksService.getBooks(this.getFilters()).subscribe(data => {
            this.books = this.books.concat(data.results);
            this.next = data.next;
            this.scollActivated = false;
            this.loadingService.hideLoading();
        })
    }

    /**
     * To get an object of selected filters
     * @param none
     * @returns {filters: object}
     */
    getFilters() {
        // Add default filter to show book only with images
        let params:any = {
            'mime_type': 'image/jpeg',
        };
        if(this.category && this.category.key){
            params.topic = this.category.key
        }
        if(this.searchQuery){
            params.search = encodeURI(this.searchQuery)
        }
        return params
    }


    /**
     * To initiate search process
     * @param none
     * @returns none
     */
    onSearch(query: string) {
        this.searchQuerySubject.next(query);
    }

    /**
     * To reset searched query
     * @param none
     * @returns none
     */
    clearSearch(){
        this.searchQuery = "";
        this.onSearch("");
    }

    subscribeSearchSubject() {
        this.searchQuerySubject.pipe(
            // Set debounce so search is not called multiple times in a second
            debounceTime(800),
            distinctUntilChanged()
        ).subscribe(model => {
            this.searchQuery = model;
            this.books = [];
            this.getBooks();
        });
    }

    /**
     * Infinite loading implementation
     * @param none
     * @returns none
     */
    onScroll(){
        this.next != null && !this.scollActivated ? this.getBooks() : false;
    }

    /**
     * To get loading status
     * @param none
     * @returns status: boolean
     */
    isLoading(){
        return this.loadingService.loadingStatus();
    }
}
