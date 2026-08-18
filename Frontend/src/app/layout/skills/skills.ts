import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SkillsService } from '../../core/services/skills-service';
import { ISkillsAPI } from '../../core/services/models/skills.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills implements OnInit {
  skills: ISkillsAPI[] = [];
  constructor(
    private _skillService: SkillsService,
    private _cdr: ChangeDetectorRef,
  ) {}
  categories: string[] = [];
  groupedSkills: { [key: string]: ISkillsAPI[] } = {};
  ngOnInit() {
    this._skillService.getSkills().subscribe((data) => {
      this.skills = data;
      this.categories = [...new Set(this.skills.map((s) => s.category))];
      this.categories.forEach((category) => {
      this.groupedSkills[category] = this.skills.filter((s) => s.category === category);
      });
      this._cdr.detectChanges();
    });
  }
}
