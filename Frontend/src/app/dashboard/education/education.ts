import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EducationService } from '../../core/services/education-service';
import { IEducationAPI } from '../../core/services/models/education.model';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Educationdetails } from './educationdetails/educationdetails';
import { Editform } from './editform/editform';

@Component({
  selector: 'app-education',
  imports: [FormsModule, CommonModule, Educationdetails, Editform],
  templateUrl: './education.html',
  styleUrl: './education.css',
})
export class Education implements OnInit{
   constructor(
      private _educationService: EducationService,
      private _cdr: ChangeDetectorRef,
    ) {}
    editingEducation: IEducationAPI | null = null;
    education: IEducationAPI[] = [];
    ngOnInit(): void {
      this._educationService.getEducation().subscribe((data) => {
        this.education = data;
        this._cdr.detectChanges();
      });
    }
    status = '';
    onSubmit(myForm: NgForm) {
      this._educationService.addEducation(myForm.value).subscribe({
        next: (data) => {
          console.log(data);
          this.education.push(data);
          this.status = 'Sucess!';
          myForm.resetForm();
        },
        error: (err) => {
          this.status = 'Failed!';
          console.log(err);
        },
      });
    }
    onEdit(education: IEducationAPI) {
      this.editingEducation = education;
    }
    onCompleteEdit(updated:IEducationAPI){
      this.education = this.education.map(s=> s._id === updated._id ? updated : s)
      this.editingEducation = null;
    }
    onCancelEdit(){
      this.editingEducation = null;
    }
    onDelete(id: string) {
      this._educationService.deleteEducation(id).subscribe((data) => {
        this.education = this.education.filter((s) => s._id !== id);
        console.log(data);
        this._cdr.detectChanges();
      });
    }
}
