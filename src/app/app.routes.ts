import { Routes } from '@angular/router';
import { CustomersResolver } from './core/resolvers/customers.resolver';
import { CustomerResolver } from './core/resolvers/customer.resolver';
import { ProductsResolver } from './core/resolvers/products.resolver';
import { ProductResolver } from './core/resolvers/product.resolver';
import { AuthGuard } from './core/guards/auth.guard'; // <-- agregado

export const routes: Routes = [
    {
        path: 'customer',
        loadComponent: () => import('./feature/customer/customer-list/customer-list.component').then(m => m.CustomerListComponent),
        resolve: { customers: CustomersResolver }
    },
    {
        path: 'customer/new',
        loadComponent: () => import('./feature/customer/customer-form/customer-form.component').then(m => m.CustomerFormComponent),
        resolve: { customer: CustomerResolver }
    },
    {
        path: 'customer/edit/:id',
        loadComponent: () => import('./feature/customer/customer-form/customer-form.component').then(m => m.CustomerFormComponent),
        resolve: { customer: CustomerResolver }
    },
    {
        path: 'product',
        loadComponent: () => import('./feature/product/product-list/product-list.component').then(m => m.ProductListComponent),
        resolve: { products: ProductsResolver },
        canActivate: [AuthGuard] // <-- protegido
    },
    {
        path: 'product/new',
        loadComponent: () => import('./feature/product/product-form/product-form.component').then(m => m.ProductFormComponent),
        resolve: { product: ProductResolver },
        canActivate: [AuthGuard] // <-- protegido
    },
    {
        path: 'product/edit/:id',
        loadComponent: () => import('./feature/product/product-form/product-form.component').then(m => m.ProductFormComponent),
        resolve: { product: ProductResolver },
        canActivate: [AuthGuard] // <-- protegido
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'customer'
    },
    {
        path: '**',
        redirectTo: 'customer'
    }
];