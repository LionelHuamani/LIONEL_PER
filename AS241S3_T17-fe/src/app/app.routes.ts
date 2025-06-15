import { Routes } from '@angular/router';


//new import
import { CustomerFormComponent } from './feature/customer/customer-form/customer-form.component';
import { CustomerListComponent } from './feature/customer/customer-list/customer-list.component';

import{ ProductFormComponent } from './feature/product/product-form/product-form.component';
import {ProductListComponent } from './feature/product/product-list/product-list.component';   

export const routes: Routes = [
    {
        path: 'customer-form',
        component: CustomerFormComponent
    },
    {
        path: 'customer-list',
        component: CustomerListComponent
    },
    {
        path: 'product-form',
        component: ProductFormComponent     
    },
    {
        path: 'product-list',
        component: ProductListComponent 
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'customer-form'
    }
];
