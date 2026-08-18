import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IProjectsAPI } from '../../../core/services/models/projects.model';

@Component({
  selector: 'app-projectdetails',
  imports: [],
  templateUrl: './projectdetails.html',
  styleUrl: './projectdetails.css',
})
export class Projectdetails {
    @Input() myProject!: IProjectsAPI;
  @Output() doEdit: EventEmitter<IProjectsAPI> = new EventEmitter<IProjectsAPI>();
  @Output() doDelete: EventEmitter<string> = new EventEmitter<string>();
  delete() {
    this.doDelete.emit(this.myProject._id);
  }
  edit() {
    this.doEdit.emit(this.myProject);
  }
}
