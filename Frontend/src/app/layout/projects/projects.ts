import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { IProjectsAPI } from '../../core/services/models/projects.model';
import { ProjectsService } from '../../core/services/projects-service';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
   projects: IProjectsAPI[] = [];
  constructor(
    private _projectService: ProjectsService,
    private _cdr: ChangeDetectorRef,
  ) {}
  ngOnInit() {
    this._projectService.getProjects().subscribe((data) => {
      this.projects = data;
      this._cdr.detectChanges();
    });
  }
}
