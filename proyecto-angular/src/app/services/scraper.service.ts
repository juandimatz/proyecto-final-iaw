import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable()
export class ScraperService {
    private url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Global.url;
    }

    getDafitiProducts(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url+ 'searchDafiti/', {headers: headers});
    }

    getNetshoesProducts(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url+ 'searchNetshoes/', {headers: headers});
    }

    getDafitiProductsForBrand(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url+ 'searchDafiti/' + id, {headers: headers});
    }

    getNetshoesProductsForBrand(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        
        return this._http.get(this.url+ 'searchNetshoes/' + id.toLowerCase(), {headers: headers});
    }

    getProductDetail(id, tienda): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url+ 'detail' + tienda + '/' + id, {headers: headers});
    }

}