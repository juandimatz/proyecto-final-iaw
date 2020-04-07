import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {

  public marca;
  public precioMin;
  public precioMax;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    
  }

  ngOnInit(): void {
  
  }

  onSubmit(brand, minPrice, maxPrice) {
    localStorage.setItem("minPrice", minPrice);
    localStorage.setItem("maxPrice", maxPrice);
    
    let url = "results/" + brand;
    this._router.navigate([url]);
  }

}
