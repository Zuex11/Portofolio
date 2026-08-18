import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISkillsAPI } from './models/skills.model';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  constructor(private _http: HttpClient) {}
  private apiURL = 'http://localhost:3000/skills';
  getSkills() {
    return this._http.get<ISkillsAPI[]>(this.apiURL);
  }
  addSkill(skillsData: ISkillsAPI) {
    return this._http.post<ISkillsAPI>(this.apiURL, skillsData);
  }
  editSkill(id: string, newData: ISkillsAPI) {
    return this._http.put<ISkillsAPI>(this.apiURL + '/' + id, newData);
  }
  deleteSkill(id:string){return this._http.delete(this.apiURL + '/' + id)}
}
