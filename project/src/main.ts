import { Component, Injectable, OnInit, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes, RouterOutlet,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, RouterLink ,Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true; // Allow access if token exists
    } else {
      alert('Please login to access this page!');
      this.router.navigate(['/login']);
      return false; // Redirect to login if not authenticated
    }
  }
}

// API Service for Authentication
@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http.post(`${this.baseUrl}/login`, { username, password });
  }

  signup(username: string, password: string) {
    return this.http.post(`${this.baseUrl}/signup`, { username, password });
  }
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Check if token exists
  }
  logout() {
    localStorage.removeItem('token'); // Remove token
    this.router.navigate(['/login']);
    alert('You have been logged out!');
  }
}

// Login Component
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="card">
      <h2>Welcome Back!</h2>
      <form (ngSubmit)="login()">
        <label>Username</label>
        <input type="text" [(ngModel)]="username" name="username" placeholder="Enter your username" required>
        
        <label>Password</label>
        <input type="password" [(ngModel)]="password" name="password" placeholder="Enter your password" required>
        
        <button class="btn btn-primary" type="submit">Login</button>
      </form>

      <p *ngIf="error" class="error">⚠️ {{ error }}</p>
      <p>Don't have an account? <a routerLink="/signup">Sign Up Here</a></p>
    </div>
  `,
   styles: [
    `.card { background-color: #f9f1e7; padding: 30px; border-radius: 12px; box-shadow: 0 8px 16px rgba(0,0,0,0.1); width: 350px; margin: 40px auto; }
     h2 { color: #8b5e3c; font-family: 'Dancing Script', cursive; }
     label { color: #8b5e3c; font-weight: 500; }
     input { width: 100%; padding: 10px; margin: 10px 0 20px; border-radius: 8px; border: 1px solid #ccc; }
     .btn-primary { background-color: #8b5e3c; color: white; border: none; padding: 12px; cursor: pointer; border-radius: 8px; width: 100%; }
     .btn-primary:hover { background-color: #6d4c41; }
     .error { color: #d9534f; }
     p{color: #8b5e3c;}
   `
  ]
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private apiService: ApiService) {}

  login() {
    this.apiService.login(this.username, this.password).subscribe(
      (response: any) => {
        alert('Login Successful!');
        localStorage.setItem('token', response.token);
        window.location.href = '/menu';
      },
      () => {
        this.error = 'Invalid username or password';
      }
    );
  }
}

// Signup Component
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="card">
      <h2>Create Your Account</h2>
      <form (ngSubmit)="signup()">
        <label>Username</label>
        <input type="text" [(ngModel)]="username" name="username" placeholder="Choose a username" required>
        
        <label>Password</label>
        <input type="password" [(ngModel)]="password" name="password" placeholder="Create a password" required>
        
        <button class="btn btn-primary" type="submit">Sign Up</button>
      </form>

      <p *ngIf="error" class="error">⚠️ {{ error }}</p>
      <p>Already have an account? <a routerLink="/login">Login Here</a></p>
    </div>
  `,
  styles: [
    `.card { background-color: #f9f1e7; padding: 30px; border-radius: 12px; box-shadow: 0 8px 16px rgba(0,0,0,0.1); width: 350px; margin: 40px auto; }
     h2 { color: #8b5e3c; font-family: 'Dancing Script', cursive; }
     label { color: #8b5e3c; font-weight: 500; }
     input { width: 100%; padding: 10px; margin: 10px 0 20px; border-radius: 8px; border: 1px solid #ccc; }
     .btn-primary { background-color: #8b5e3c; color: white; border: none; padding: 12px; cursor: pointer; border-radius: 8px; width: 100%; }
     .btn-primary:hover { background-color: #6d4c41; }
     .error { color: #d9534f; }
     p{color: #8b5e3c;}
   `
  ]
})
export class SignupComponent {
  username = '';
  password = '';
  error = '';

  constructor(private apiService: ApiService) {}

  signup() {
    this.apiService.signup(this.username, this.password).subscribe(
      () => {
        alert('Signup Successful! Please Login.');
        window.location.href = '/login';
      },
      () => {
        this.error = 'Signup failed. Please try again.';
      }
    );
  }
}
// Cart Service to manage cart items
@Injectable({ providedIn: 'root' })
export class CartService {
  cart: any[] = [];

  addToCart(item: any) {
    const existingItem = this.cart.find(cartItem => cartItem.name === item.name);
    if (existingItem) {
      existingItem.quantity += item.quantity;
      existingItem.totalPrice += item.price * item.quantity;
    } else {
      this.cart.push({ ...item, totalPrice: item.price * item.quantity });
    }
    console.log('Item added to cart:', item);
  }

  getCart() {
    return this.cart;
  }

  clearCart() {
    this.cart = [];
  }
  removeItem(itemName: string) {
    this.cart = this.cart.filter(item => item.name !== itemName);
  }
}

// Menu Component
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="menu-container">
      <h2 class="title">Cafe Menu</h2>
      <div class="menu-grid">
        <div class="menu-item" *ngFor="let item of menuItems">
          <img [src]="item.image" alt="{{ item.name }}" class="menu-img">
          <h3>{{ item.name }}</h3>
          <p class="price">{{ item.price | currency }}</p>
          <p class="category">Category: {{ item.category }}</p>
          <div class="quantity">
            <button (click)="decreaseQuantity(item)">-</button>
            <span>{{ item.quantity }}</span>
            <button (click)="increaseQuantity(item)">+</button>
          </div>
          <button class="btn add-btn" (click)="addToCart(item)">Add to Cart</button>
        </div>
      </div>
      <button class="btn checkout-btn" (click)="goToBilling()">Proceed to Checkout</button>
    </div>
  `,
  styles: `
    .menu-container { padding: 40px; background-color: #fff8f0}
    .title { color: #6d4c41; font-size: 2.5rem; margin-bottom: 20px; }
    .menu-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
    .menu-item { background: #fff; padding: 20px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    .menu-item h3 { color: #8b5e3c; }
    .menu-img { width: 100%; height: 180px; border-radius: 8px; object-fit: cover; }
    .price { color: #d17b4a; font-weight: bold; }
    .category { color: #8b5e3c; font-style: italic; }
    .quantity button { background-color: #d17b4a; color: white; border: none; border-radius: 50%; width: 30px; height: 30px; }
    .add-btn { background-color: #8b5e3c; color: white; margin-top: 10px; }
    .checkout-btn { margin-top: 40px; background-color: #8b5e3c; color: white; padding: 10px 30px; font-size: 1.2rem; }
    .quantity span{color: #8b5e3c;}
 `
})
export class MenuComponent {
  menuItems = [
    { name: 'Cappuccino', price: 4.50, category: 'Coffee', image: 'https://media.istockphoto.com/id/1442009345/photo/mocha-with-latte-art-served-in-a-cup-isolated-on-dark-grey-background-top-view-of-hot-coffee.jpg?b=1&s=612x612&w=0&k=20&c=O-WNkWR8xjys1_yRSRzBI8O_gaKW2CUFoIhdp2bwIgI=', quantity: 1 },
    { name: 'Croissant', price: 3.50, category: 'Pastries', image: 'https://images.pexels.com/photos/1510682/pexels-photo-1510682.jpeg?auto=compress&cs=tinysrgb&w=600', quantity: 1 },
    { name: 'Latte', price: 4.00, category: 'Coffee', image: 'https://images.pexels.com/photos/30395140/pexels-photo-30395140/free-photo-of-artistic-latte-with-leaf-design-in-sunlight.jpeg?auto=compress&cs=tinysrgb&w=600', quantity: 1 },
    { name: 'Espresso', price: 3.00, category: 'Coffee', image: 'https://images.pexels.com/photos/2299028/pexels-photo-2299028.jpeg?auto=compress&cs=tinysrgb&w=600', quantity: 1 },
    { name: 'Americano', price: 3.25, category: 'Coffee', image: 'https://images.pexels.com/photos/13129674/pexels-photo-13129674.jpeg?auto=compress&cs=tinysrgb&w=600', quantity: 1 },
    { name: 'Macchiato', price: 4.75, category: 'Coffee', image: 'https://images.pexels.com/photos/31269834/pexels-photo-31269834/free-photo-of-fresh-espresso-macchiato-on-wooden-table.jpeg?auto=compress&cs=tinysrgb&w=600', quantity: 1 },
    { name: 'Muffin', price: 2.80, category: 'Pastries', image: 'https://images.pexels.com/photos/131899/pexels-photo-131899.jpeg?auto=compress&cs=tinysrgb&w=600', quantity: 1 },
    { name: 'Bagel', price: 2.50, category: 'Pastries', image: 'https://images.pexels.com/photos/3957501/pexels-photo-3957501.jpeg?auto=compress&cs=tinysrgb&w=600', quantity: 1 },
    { name: 'Cheesecake', price: 5.00, category: 'Pastries', image: 'https://images.pexels.com/photos/1098592/pexels-photo-1098592.jpeg?auto=compress&cs=tinysrgb&w=600', quantity: 1 },
    { name: 'Sandwich', price: 6.50, category: 'Snacks', image: 'https://images.pexels.com/photos/1885578/pexels-photo-1885578.jpeg?auto=compress&cs=tinysrgb&w=600', quantity: 1 },
    { name: 'Iced Coffee', price: 4.20, category: 'Coffee', image: 'https://images.pexels.com/photos/1162455/pexels-photo-1162455.jpeg?auto=compress&cs=tinysrgb&w=600', quantity: 1 },
    { name: 'Hot Chocolate', price: 4.00, category: 'Beverages', image: 'https://images.pexels.com/photos/3551717/pexels-photo-3551717.png?auto=compress&cs=tinysrgb&w=600', quantity: 1 },
    { name: 'Fruit Tart', price: 4.80, category: 'Pastries', image: 'https://images.pexels.com/photos/13471546/pexels-photo-13471546.jpeg?auto=compress&cs=tinysrgb&w=600', quantity: 1 },
    { name: 'Smoothie', price: 5.50, category: 'Beverages', image: 'https://images.pexels.com/photos/434295/pexels-photo-434295.jpeg?auto=compress&cs=tinysrgb&w=600', quantity: 1 },
  ];

  constructor(private cartService: CartService, private router: Router) {}

  increaseQuantity(item: any) { item.quantity++; }
  decreaseQuantity(item: any) { if (item.quantity > 1) item.quantity--; }
  addToCart(item: any) {
    this.cartService.addToCart(item);
    alert(`${item.name} added to cart with quantity: ${item.quantity}`);
  }
  goToBilling() { this.router.navigate(['/billing']); }
}

// Billing Component
@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="billing-container">
      <h2 class="title">Your Cart</h2>
      <div *ngIf="cart.length > 0; else emptyCart">
        <div class="cart-item" *ngFor="let item of cart">
          <p>{{ item.name }} ({{ item.quantity }} x {{ item.price | currency }}) - Total: {{ item.totalPrice | currency }}</p>
          <button class="btn remove-btn" (click)="removeItem(item.name)">Remove</button>
        </div>
        <h3 class="total">Total: {{ getTotal() | currency }}</h3>
        <button class="btn confirm-btn" (click)="confirmOrder()">Confirm Order</button>
      </div>
      <ng-template #emptyCart>
        <p>Your cart is empty. Please add items from the menu.</p>
      </ng-template>
    </div>
  `,
  styles: `
    .billing-container { padding: 40px; background-color: #fff8f0; }
    .title { color: #6d4c41; font-size: 2.5rem; }
    .cart-item { background-color: #fff; padding: 15px; border-radius: 8px; margin-bottom: 10px; }
    .remove-btn { background-color: #d9534f; color: white; }
    .confirm-btn { background-color: #8b5e3c; color: white; font-size: 1.2rem; }
    .total { color: #8b5e3c; font-weight: bold; margin-top: 20px; }
    p{color: #8b5e3c;}
 `
})
export class BillingComponent implements OnInit {
  cart: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() { this.cart = this.cartService.getCart(); }
  getTotal() { return this.cart.reduce((sum, item) => sum + item.totalPrice, 0); }
  confirmOrder() { alert('Order confirmed!'); this.cartService.clearCart(); window.location.href = '/menu'; }
  removeItem(itemName: string) { this.cartService.removeItem(itemName); this.cart = this.cartService.getCart(); }
}


// App Component
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <div class="header">
      <h1>{{ title }}</h1>
      <nav>
       
        <button class="nav-btn" routerLink="/menu">Menu</button>
        
        <button class="nav-btn" routerLink="/billing">Billing</button>
        
                <!-- Conditional Rendering -->
        <button class="nav-btn" *ngIf="!isAuthenticated()" routerLink="/login">Login</button>
        <button class="nav-btn" *ngIf="isAuthenticated()" (click)="logout()">Logout</button>

      </nav>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .nav-btn {
      margin-right: 10px;
      background-color: #8b5e3c;
      color: white;
      border: none;
      padding: 10px;
      cursor: pointer;
      border-radius: 5px;
    }
    .nav-btn:hover {
      background-color: #6d4c41;
    }
    .title
    {
      font-family: 'Ariel', cursive;
      font-size: 3rem;
      color: #8b5e3c;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
    }
  `]
})
export class AppComponent {
  title = 'Cafe Italioso de';
  constructor(private apiService: ApiService) {}

  isAuthenticated(): boolean {
    return this.apiService.isAuthenticated();
  }

  logout() {
    this.apiService.logout();


}
}

// Routes
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard]},
  { path: 'billing', component: BillingComponent , canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/login' }
];

// Bootstrap
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    CartService,
    ApiService,
    importProvidersFrom(HttpClientModule)
  ]
});
/*
menuItems = [
    { name: 'Cappuccino', price: 4.50, category: 'Coffee', image: 'https://media.istockphoto.com/id/1442009345/photo/mocha-with-latte-art-served-in-a-cup-isolated-on-dark-grey-background-top-view-of-hot-coffee.jpg?b=1&s=612x612&w=0&k=20&c=O-WNkWR8xjys1_yRSRzBI8O_gaKW2CUFoIhdp2bwIgI=', quantity: 1 },
    { name: 'Croissant', price: 3.50, category: 'Pastries', image: 'https://images.pexels.com/photos/1510682/pexels-photo-1510682.jpeg?auto=compress&cs=tinysrgb&w=600', quantity: 1 },
    { name: 'Latte', price: 4.00, category: 'Coffee', image: 'https://images.pexels.com/photos/30395140/pexels-photo-30395140/free-photo-of-artistic-latte-with-leaf-design-in-sunlight.jpeg?auto=compress&cs=tinysrgb&w=600', quantity: 1 },
    { name: 'Espresso', price: 3.00, category: 'Coffee', image: 'https://images.pexels.com/photos/2299028/pexels-photo-2299028.jpeg?auto=compress&cs=tinysrgb&w=600', quantity: 1 },
    { name: 'Americano', price: 3.25, category: 'Coffee', image: 'https://images.pexels.com/photos/13129674/pexels-photo-13129674.jpeg?auto=compress&cs=tinysrgb&w=600', quantity: 1 },
    { name: 'Macchiato', price: 4.75, category: 'Coffee', image: 'https://images.pexels.com/photos/31269834/pexels-photo-31269834/free-photo-of-fresh-espresso-macchiato-on-wooden-table.jpeg?auto=compress&cs=tinysrgb&w=600', quantity: 1 },
    { name: 'Muffin', price: 2.80, category: 'Pastries', image: 'https://images.pexels.com/photos/131899/pexels-photo-131899.jpeg?auto=compress&cs=tinysrgb&w=600', quantity: 1 },
    { name: 'Bagel', price: 2.50, category: 'Pastries', image: 'https://images.pexels.com/photos/3957501/pexels-photo-3957501.jpeg?auto=compress&cs=tinysrgb&w=600', quantity: 1 },
    { name: 'Cheesecake', price: 5.00, category: 'Pastries', image: 'https://images.pexels.com/photos/1098592/pexels-photo-1098592.jpeg?auto=compress&cs=tinysrgb&w=600', quantity: 1 },
    { name: 'Sandwich', price: 6.50, category: 'Snacks', image: 'https://images.pexels.com/photos/1885578/pexels-photo-1885578.jpeg?auto=compress&cs=tinysrgb&w=600', quantity: 1 },
    { name: 'Iced Coffee', price: 4.20, category: 'Coffee', image: 'https://images.pexels.com/photos/1162455/pexels-photo-1162455.jpeg?auto=compress&cs=tinysrgb&w=600', quantity: 1 },
    { name: 'Hot Chocolate', price: 4.00, category: 'Beverages', image: 'https://images.pexels.com/photos/3551717/pexels-photo-3551717.png?auto=compress&cs=tinysrgb&w=600', quantity: 1 },
    { name: 'Fruit Tart', price: 4.80, category: 'Pastries', image: 'https://images.pexels.com/photos/13471546/pexels-photo-13471546.jpeg?auto=compress&cs=tinysrgb&w=600', quantity: 1 },
    { name: 'Smoothie', price: 5.50, category: 'Beverages', image: 'https://images.pexels.com/photos/434295/pexels-photo-434295.jpeg?auto=compress&cs=tinysrgb&w=600', quantity: 1 },
  ];
*/