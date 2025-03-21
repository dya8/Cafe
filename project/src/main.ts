import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';


import { provideRouter, Routes, RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

// Dashboard Component
@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `...` // Same as yours
})
export class DashboardComponent {}

// Menu Component
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <h2>Menu Management</h2>
      <div class="menu-grid">
        <div class="menu-item" *ngFor="let item of menuItems">
          <h3>{{item.name}}</h3>
          <p>{{item.price | currency}}</p>
          <p>{{item.category}}</p>
          <button class="btn" (click)="editItem(item)">Edit</button>
        </div>
        <div class="menu-item add-new">
          <button class="btn btn-primary" (click)="addItem()">Add New Item</button>
        </div>
      </div>
    </div>
  `
})
export class MenuComponent {
  menuItems = [
    { name: 'Cappuccino', price: 4.50, category: 'Coffee' },
    { name: 'Croissant', price: 3.50, category: 'Pastries' },
    { name: 'Latte', price: 4.00, category: 'Coffee' }
  ];

  addItem() { console.log('Add item clicked'); }
  editItem(item: any) { console.log('Edit item:', item); }
}

// Orders Component
@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  template: `...` // Same as yours
})
export class OrdersComponent {
  orders = [
    { id: 1, status: 'Pending', items: '2x Cappuccino, 1x Croissant', total: 12.50 },
    { id: 2, status: 'Processing', items: '1x Latte, 2x Croissant', total: 11.00 }
  ];
}

// Root Component
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <div class="header">
      <h1>{{title}}</h1>
      <nav>
        <a class="nav-link" routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
        <a class="nav-link" routerLink="/menu" routerLinkActive="active">Menu</a>
        <a class="nav-link" routerLink="/orders" routerLinkActive="active">Orders</a>
      </nav>
    </div>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class App {
  title = 'Cafe Management';
}

// Routes
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'orders', component: OrdersComponent },
  { path: '**', redirectTo: '/dashboard' } // Wildcard route
];

// Bootstrap
bootstrapApplication(App, {
  providers: [
    provideRouter(routes)
  ]
});