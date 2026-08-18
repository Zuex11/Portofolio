import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProjectsAPI } from './models/projects.model';
@Injectable({
    providedIn:'root'
})


export class ProjectsService {
  constructor(private _http: HttpClient) {}
  private apiURL = 'http://localhost:3000/projects';
  getProjects() {
    return this._http.get<IProjectsAPI[]>(this.apiURL);
  }
  addProject(projectData: IProjectsAPI) {
    return this._http.post<IProjectsAPI>(this.apiURL, projectData);
  }
  editProject(id: string, newData: IProjectsAPI) {
    return this._http.put<IProjectsAPI>(this.apiURL + '/' + id, newData);
  }
  deleteProject(id: string) {
    return this._http.delete(this.apiURL + '/' + id);
  }
}
