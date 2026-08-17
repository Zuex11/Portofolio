import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAboutAPI } from './models/about.model';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  constructor(private _http: HttpClient) {}
  private apiURL = 'http://localhost:3000/about';
  getInfo() {
    return this._http.get<IAboutAPI>(this.apiURL);
  }
  addInfo(portoData:FormData){return this._http.put(this.apiURL, portoData)}
}
