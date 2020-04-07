import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultsComponent } from './components/results/results.component';
import { SearchComponent } from './components/search/search.component';
import { DetailComponent } from './components/detail/detail.component';

const appRoutes: Routes = [
    {path: '', component: SearchComponent},
    {path: 'search', component: SearchComponent},
    {path: 'results/:marca', component: ResultsComponent},
    {path: 'detail/:tienda/:id', component: DetailComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);