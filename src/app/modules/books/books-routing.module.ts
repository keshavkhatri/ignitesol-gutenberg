import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BooksComponent } from './books.component';
import { ListComponent } from './components/list/list.component';

const routes: Routes = [
    {
        path: '',
        component: BooksComponent
    },
    {
        path: 'list',
        component: ListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BooksRoutingModule { }
