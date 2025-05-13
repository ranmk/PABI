import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassificationService {
  private apiUrl = 'http://localhost:5000/api/risk/predict';  // Adjust if needed

  constructor(private http: HttpClient) {}

  predictRisk(inputData: any): Observable<any> {
    return this.http.post(this.apiUrl, inputData);
  }
}
