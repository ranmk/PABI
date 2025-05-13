import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClusteringService {
  private apiUrl = 'http://localhost:5000/api/cluster/predict';

  constructor(private http: HttpClient) {}

  predictCluster(inputData: any): Observable<any> {
    return this.http.post(this.apiUrl, inputData);
  }
}
