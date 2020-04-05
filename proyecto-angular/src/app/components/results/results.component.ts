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
      
      /*if (params['minPrice'] != "undefined") {
        this.minPrice = parseInt(params['minPrice']);
      }
      
      if (params['maxPrice'] != "undefined") {
        this.maxPrice = parseInt(params['maxPrice']);
      }*/
      
      if (params['marca'] == "undefined") {
        this.getProducts();
      } else {
        this.getBrandProducts(params['marca']);
      }

    });
  }

  getProducts() {
    this._scraperService.getDafitiProducts().subscribe(
      response => {
        response.forEach(element => {
          this.shoes.push(element);
        });
      },
      error => {
        console.log(error);
      }
    );
    this._scraperService.getNetshoesProducts().subscribe(
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

  getBrandProducts(id) {
    this._scraperService.getDafitiProductsForBrand(id).subscribe(
      response => {
        response.forEach(element => {
          this.shoes.push(element);
        });
      },
      error => {
        console.log(error);
      }
    );
    this._scraperService.getNetshoesProductsForBrand(id).subscribe(
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

  goToDetail(event, id, tienda) {
    let url = "detail/" + tienda + "/" + id;
    this._router.navigate([url]);
  }

  getMinPrice() {
    return this.minPrice;
  }
  
  getMaxPrice() {
    return this.maxPrice;
  }

  getShoes() {
    return this.shoes;
  }

}
