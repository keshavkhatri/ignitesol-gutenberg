import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './books.component';
import { GenreCardComponent } from './components/genre-card/genre-card.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { BooksRoutingModule } from './books-routing.module';
import { ListComponent } from './components/list/list.component';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule} from '../../common/shared.module';

@NgModule({
    imports: [
        CommonModule,
        BooksRoutingModule,
        FormsModule, 
        InfiniteScrollModule,
        SharedModule
    ],
    declarations: [
        BooksComponent,
        GenreCardComponent, 
        BookCardComponent, ListComponent
    ],
})
export class BooksModule { }
