import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { IEducationAPI } from '../../../core/services/models/education.model';
import { EducationService } from '../../../core/services/education-service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editform',
  imports: [FormsModule, CommonModule],
  templateUrl: './editform.html',
  styleUrl: './editform.css',
})
export class Editform {
  @Input() education!: IEducationAPI;
  @Output() editDone = new EventEmitter<IEducationAPI>();
  @Output() cancelled = new EventEmitter<void>();
  constructor(
    private _educationService: EducationService,
    private _cdr: ChangeDetectorRef,
  ) {}
  editStatus = '';

  onEditSubmit(myForm: NgForm) {
    this._educationService.editEducation(this.education._id, myForm.value).subscribe({
      next: (data) => {
        console.log(data);
        this.editStatus = 'Success!';
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
