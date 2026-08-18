import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IMessageAPI } from '../../../core/services/models/messages.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-messagesdetails',
  imports: [CommonModule],
  templateUrl: './messagesdetails.html',
  styleUrl: './messagesdetails.css',
})
export class Messagesdetails {
  @Input() myMessage!: IMessageAPI;
  @Output() doMarkRead: EventEmitter<string> = new EventEmitter<string>();
  @Output() doDelete: EventEmitter<string> = new EventEmitter<string>();
  @Output() doMarkUnread: EventEmitter<string> = new EventEmitter<string>();
  markUnread() {
    this.doMarkUnread.emit(this.myMessage._id);
  }
  markRead() {
    this.doMarkRead.emit(this.myMessage._id);
  }
  delete() {
    this.doDelete.emit(this.myMessage._id);
  }
}
