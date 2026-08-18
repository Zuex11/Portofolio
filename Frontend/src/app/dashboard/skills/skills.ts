import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SkillsService } from '../../core/services/skills-service';
import { ISkillsAPI } from '../../core/services/models/skills.model';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Skillsdetails } from './skillsdetails/skillsdetails';
import { Editform } from './editform/editform';

@Component({
  selector: 'app-skills',
  imports: [FormsModule, CommonModule, Skillsdetails, Editform],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills implements OnInit {
  constructor(
    private _skillsService: SkillsService,
    private _cdr: ChangeDetectorRef,
  ) {}
  editingSkill: ISkillsAPI | null = null;
  skills: ISkillsAPI[] = [];
  ngOnInit(): void {
    this._skillsService.getSkills().subscribe((data) => {
      this.skills = data;
      this._cdr.detectChanges();
    });
  }
  status = '';
  onSubmit(myForm: NgForm) {
    this._skillsService.addSkill(myForm.value).subscribe({
      next: (data) => {
        console.log(data);
        this.skills.push(data);
        this.status = 'Sucess!';
        myForm.resetForm();
      },
      error: (err) => {
        this.status = 'Failed!';
        console.log(err);
      },
    });
  }
  onEdit(skill: ISkillsAPI) {
    this.editingSkill = skill;
  }
  onCompleteEdit(updated:ISkillsAPI){
    this.skills = this.skills.map(s=> s._id === updated._id ? updated : s)
    this.editingSkill = null;
  }
  onCancelEdit(){
    this.editingSkill = null;
  }
  onDelete(id: string) {
    this._skillsService.deleteSkill(id).subscribe((data) => {
      this.skills = this.skills.filter((s) => s._id !== id);
      console.log(data);
      this._cdr.detectChanges();
    });
  }
}
