import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent {
  user = { email: '', password: '' };
  showPassword = false;

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit() {
    this.http.post('http://localhost:5000/api/purchase/login', {
      username: this.user.email,
      password: this.user.password,
      required_role: 'purchase'  // Enforce purchase role here
    }).subscribe({
      next: (response: any) => {
        console.log('Login Success:', response);
        this.router.navigate(['/dashboard/purchase/insights']);
      },
      error: (error) => {
        console.error('Login Failed:', error);
        alert(error.error.message || 'Invalid email or password.');
      }
    });
  }


}
