import { Component, OnInit } from '@angular/core';
import { ScraperService } from '../../services/scraper.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  providers: [ScraperService]
})
export class ResultsComponent implements OnInit {

  private shoes = [];
  private maxPrice;
  private minPrice;
  private brand;
  
  constructor(
    private _scraperService: ScraperService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    this.minPrice = (localStorage.getItem("minPrice") != "undefined") ? localStorage.getItem("minPrice") : 0;
    this.maxPrice = (localStorage.getItem("maxPrice") != "undefined") ? localStorage.getItem("maxPrice") : 15000;
  }

  ngOnInit() {
    this._route.params.subscribe((params) => {
      this.brand = params['marca'];
      this.getProducts(params['marca']);
    });
  }

  goToDetail(event, id, tienda) {
    let url = "detail/" + tienda + "/" + id;
    this._router.navigate([url]);
  }

  getProducts(marca) {
    
    this.getDafitiProducts(marca);
    
    this.getNetshoesProducts(marca);
  
  }

  getDafitiProducts(marca) {
    this._scraperService.getDafitiProducts(marca).subscribe(
      response => {
        response.forEach(element => {
          this.shoes.push(element);
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  getNetshoesProducts(marca) {
    this._scraperService.getNetshoesProducts(marca).subscribe(
      response => {
        response.forEach(element => {
          this.shoes.push(element);
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  getMinPrice() {
    return this.minPrice;
  }
  
  getMaxPrice() {
    return this.maxPrice;
  }

  getShoes() {
    for (let shoe of this.shoes) {
      shoe.price = parseInt(shoe.price);
    }
    return this.shoes;
  }

}
