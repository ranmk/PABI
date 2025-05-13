import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss']
})
export class FinanceComponent {
  user = { email: '', password: '' };
  showPassword = false;

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit() {
    this.http.post('http://localhost:5000/api/finance/login', {
      username: this.user.email,
      password: this.user.password
    }).subscribe({
      next: (response: any) => {
        console.log('Login Success:', response);
        this.router.navigate(['/dashboard/finance/visualisation']);
      },
      error: (error) => {
        console.error('Login Failed:', error);
        alert(error.error.message || 'Invalid email or password.');
      }
    });

  }

}
