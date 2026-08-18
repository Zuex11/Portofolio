import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SkillsService } from '../../../core/services/skills-service';
import { ISkillsAPI } from '../../../core/services/models/skills.model';

@Component({
  selector: 'app-editform',
  imports: [FormsModule],
  templateUrl: './editform.html',
  styleUrl: './editform.css',
})
export class Editform {
  @Input() skill!: ISkillsAPI;
  @Output() editDone = new EventEmitter<ISkillsAPI>();
  @Output() cancelled = new EventEmitter<void>();
  constructor(private _skillsService: SkillsService, private _cdr:ChangeDetectorRef) {}
  editStatus = '';

  onEditSubmit(myForm: NgForm) {
    this._skillsService.editSkill(this.skill._id, myForm.value).subscribe({
      next: (data) => {
        console.log(data);
        this.editStatus = "Success!"
        this.editDone.emit(data);
        this._cdr.detectChanges();
      },
      error: (err) => {
        this.editStatus = 'Failed!';
        console.log(err);
        this._cdr.detectChanges();
      },
    });
  }
}
