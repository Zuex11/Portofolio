import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Projectdetails } from './projectdetails/projectdetails';
import { Editform } from './editform/editform';
import { IProjectsAPI } from '../../core/services/models/projects.model';
import { ProjectsService } from '../../core/services/projects-service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-projects',
  imports: [FormsModule, Projectdetails, Editform, CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit {
  constructor(
    private _projectService: ProjectsService,
    private _cdr: ChangeDetectorRef,
  ) {}
  editingProject: IProjectsAPI | null = null;
  projects: IProjectsAPI[] = [];
  ngOnInit(): void {
    this._projectService.getProjects().subscribe((data) => {
      this.projects = data;
      this._cdr.detectChanges();
    });
  }
  status = '';
  onSubmit(myForm: NgForm) {
    this._projectService.addProject(myForm.value).subscribe({
      next: (data) => {
        console.log(data);
        this.projects.push(data);
        this.status = 'Sucess!';
        myForm.resetForm();
      },
      error: (err) => {
        this.status = 'Failed!';
        console.log(err);
      },
    });
  }
  onEdit(project: IProjectsAPI) {
    this.editingProject = project;
  }
  onCompleteEdit(updated: IProjectsAPI) {
    this.projects = this.projects.map((s) => (s._id === updated._id ? updated : s));
    this.editingProject = null;
  }
  onCancelEdit() {
    this.editingProject = null;
  }
  onDelete(id: string) {
    this._projectService.deleteProject(id).subscribe((data) => {
      this.projects = this.projects.filter((s) => s._id !== id);
      console.log(data);
      this._cdr.detectChanges();
    });
  }
}
