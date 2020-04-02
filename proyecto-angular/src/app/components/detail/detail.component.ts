import { Component, OnInit } from '@angular/core';
import { ScraperService } from '../../services/scraper.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [
    ScraperService
  ]
})
export class DetailComponent implements OnInit {

  public product;
  public keys = [];
  public values = [];

  constructor(
    private _scraperService: ScraperService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.getProductDetail(params.id, params.tienda);
    });
  }

  getProductDetail(id, tienda) {
      
    this._scraperService.getProductDetail(id, tienda).subscribe(
      response => {
        this.product = response;
        this.product.details.forEach(element => {
          this.keys.push(Object.keys(element));
          this.values.push(Object.values(element));
        });
      },
      error => {
        console.log(error);
      }
    );

  }

  goBack() {
    this._location.back();
  }

}
