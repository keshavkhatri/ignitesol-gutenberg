import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { map, catchError } from "rxjs/operators";
import { from, Observable } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BooksService {

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    /**
     * To get categories
     * @param key: string {to get specified category}
     * @returns {promise} 
     */
    getCategories(key?: string) {
        var promise = new Promise((resolve, reject) => {
            let categories = [
                {
                    name: 'Fiction',
                    icon: 'Fiction.svg',
                    key: 'fiction',
                },
                {
                    name: 'Drama',
                    icon: 'Drama.svg',
                    key: 'drama',
                },
                {
                    name: 'Humour',
                    icon: 'Humour.svg',
                    key: 'humour',
                },
                {
                    name: 'Politics',
                    icon: 'Politics.svg',
                    key: 'politics',
                },
                {
                    name: 'Philosophy',
                    icon: 'Philosophy.svg',
                    key: 'philosophy',
                },
                {
                    name: 'History',
                    icon: 'History.svg',
                    key: 'history',
                },
                {
                    name: 'Adventure',
                    icon: 'Adventure.svg',
                    key: 'Adventure',
                },
            ];

            if (key) {
                categories = categories.filter((category) => {
                    return category.key == key
                })
            }

            resolve(categories);
        });
        return promise;
    }

    /**
     * To get Books
     * @param params: object {filters for getting books}
     * @returns {Observable} 
     */
    getBooks(params?) {
        return from(
            this.http.get(
                environment.apiBase,
                {
                    params: params
                }
            )
        ).pipe(
            map((response: any) => {
                return response;
            }),
            catchError(err => {
                console.log(err);
                return err;
            })
        );
    }
}
