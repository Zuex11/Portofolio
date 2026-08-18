import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ISkillsAPI } from '../../../core/services/models/skills.model';

@Component({
  selector: 'app-skillsdetails',
  imports: [],
  templateUrl: './skillsdetails.html',
  styleUrl: './skillsdetails.css',
})
export class Skillsdetails {
  @Input() mySkill !: ISkillsAPI;
  @Output() doEdit : EventEmitter<ISkillsAPI> = new EventEmitter<ISkillsAPI>();
  @Output() doDelete : EventEmitter<string> = new EventEmitter<string>();
delete(){
  this.doDelete.emit(this.mySkill._id);
}
edit(){
  this.doEdit.emit(this.mySkill)
}
}
