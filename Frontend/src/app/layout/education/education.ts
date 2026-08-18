import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { IEducationAPI } from '../../core/services/models/education.model';
import { EducationService } from '../../core/services/education-service';

@Component({
  selector: 'app-education',
  imports: [CommonModule],
  templateUrl: './education.html',
  styleUrl: './education.css',
})
export class Education {
  education: IEducationAPI[] = [];
  constructor(
    private _educationService: EducationService,
    private _cdr: ChangeDetectorRef,
  ) {}
  ngOnInit() {
    this._educationService.getEducation().subscribe((data) => {
      this.education = data;
      this._cdr.detectChanges();
    });
  }
}
