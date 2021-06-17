import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-book-card',
    templateUrl: './book-card.component.html',
    styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {

    @Input() book;

    constructor() { }

    ngOnInit(){
    }

    /**
     * To fetch Books from api
     * @param book: object
     */
    showBook(book){
        let validFormats = [];

        // Get all the viewable formats into validFormats array
        for(let format in book.formats){
            if(book.formats[format].includes('.htm')){
                validFormats.push({
                    format:'html',
                    value: book.formats[format]
                })
            }else if(book.formats[format].includes('.html')){
                validFormats.push({
                    format:'html',
                    value: book.formats[format]
                })
            }else if(book.formats[format].includes('.pdf')){
                validFormats.push({
                    format:'pdf',
                    value: book.formats[format]
                })
            }else if(book.formats[format].includes('.txt')){
                validFormats.push({
                    format:'txt',
                    value: book.formats[format]
                })
            }
        }

        // Show book if a valid format is available
        if(validFormats.length > 0){
            validFormats.sort((a, b) => {
                return a.format > b.format ? 1 : -1;
            });
            window.open(validFormats[0].value);
        }else{
            alert("No readable format available.");
        }
    }

}
