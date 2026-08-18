import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IEducationAPI } from '../../../core/services/models/education.model';

@Component({
  selector: 'app-educationdetails',
  imports: [],
  templateUrl: './educationdetails.html',
  styleUrl: './educationdetails.css',
})
export class Educationdetails {
  @Input() myEducation!: IEducationAPI;
  @Output() doEdit: EventEmitter<IEducationAPI> = new EventEmitter<IEducationAPI>();
  @Output() doDelete: EventEmitter<string> = new EventEmitter<string>();
  delete() {
    this.doDelete.emit(this.myEducation._id);
  }
  edit() {
    this.doEdit.emit(this.myEducation);
  }
}
