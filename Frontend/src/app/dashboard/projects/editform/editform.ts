import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { ProjectsService } from '../../../core/services/projects-service';
import { IProjectsAPI } from '../../../core/services/models/projects.model';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-editform',
  imports: [FormsModule],
  templateUrl: './editform.html',
  styleUrl: './editform.css',
})
export class Editform {
  @Input() project!: IProjectsAPI;
  @Output() editDone = new EventEmitter<IProjectsAPI>();
  @Output() cancelled = new EventEmitter<void>();
  constructor(
    private _projectService: ProjectsService,
    private _cdr: ChangeDetectorRef,
  ) {}
  editStatus = '';

  onEditSubmit(myForm: NgForm) {
    this._projectService.editProject(this.project._id, myForm.value).subscribe({
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
