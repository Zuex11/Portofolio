import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEducationAPI } from './models/education.model';

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  constructor(private _http: HttpClient) {}
  private apiURL = 'http://localhost:3000/education';
  getEducation() {
    return this._http.get<IEducationAPI[]>(this.apiURL);
  }
  addEducation(educationData: IEducationAPI) {
    return this._http.post<IEducationAPI>(this.apiURL, educationData);
  }
  editEducation(id: string, newData: IEducationAPI) {
    return this._http.put<IEducationAPI>(this.apiURL + '/' + id, newData);
  }
  deleteEducation(id: string) {
    return this._http.delete(this.apiURL + '/' + id);
  }
}
