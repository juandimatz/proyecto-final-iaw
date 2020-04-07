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

    getDafitiProducts(marca): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        if (marca == 'undefined') {
            return this._http.get(this.url+ 'searchDafiti/', {headers: headers});
        } else {
            return this._http.get(this.url+ 'searchDafiti/' + marca, {headers: headers});
        }
    }
        
    getNetshoesProducts(marca): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        if (marca == 'undefined') {
            return this._http.get(this.url+ 'searchNetshoes/', {headers: headers});
        } else {
            return this._http.get(this.url+ 'searchNetshoes/' + marca.toLowerCase(), {headers: headers});
        }
        
    }

    getProductDetail(id, tienda): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url+ 'detail' + tienda + '/' + id, {headers: headers});
    }

}