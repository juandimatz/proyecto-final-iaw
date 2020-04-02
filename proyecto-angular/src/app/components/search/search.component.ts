import { Component, OnInit } from '@angular/core';
import { SearchObject } from '../../models/SearchObejct';
import { ScraperService } from '../../services/scraper.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public marca;
  public precioMin;
  public precioMax;
  public products = [];

  constructor(
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    
  }

  ngOnInit(): void {
  
  }

  onSubmit(brand, minPrice, maxPrice) {
    let url = "results/" + minPrice + "/" + maxPrice + "/" + brand;
    this._router.navigate([url]);
  }

  
  
}
