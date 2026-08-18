import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../core/services/message-service';
import { IMessageAPI } from '../../core/services/models/messages.model';
import { Messagesdetails } from './messagesdetails/messagesdetails';

@Component({
  selector: 'app-messages',
  imports: [CommonModule, Messagesdetails],
  templateUrl: './messages.html',
  styleUrl: './messages.css',
})
export class Messages implements OnInit {
  constructor(
    private _messageService: MessageService,
    private _cdr: ChangeDetectorRef,
  ) {}
  messages: IMessageAPI[] = [];
  showUnreadOnly = false;

  toggleUnreadFilter() {
    this.showUnreadOnly = !this.showUnreadOnly;
  }

  get filteredMessages() {
    return this.showUnreadOnly ? this.messages.filter((m) => !m.isRead) : this.messages;
  }
  ngOnInit(): void {
    this._messageService.getMessages().subscribe((data) => {
      this.messages = data;
      this._cdr.detectChanges();
    });
  }
  onMarkUnread(id: string) {
    this._messageService.markAsUnread(id).subscribe({
      next: (data) => {
        this.messages = this.messages.map((m) => (m._id === id ? data : m));
        this._cdr.detectChanges();
      },
      error: (err) => console.log(err),
    });
  }
  onMarkRead(id: string) {
    this._messageService.markAsRead(id).subscribe({
      next: (data) => {
        this.messages = this.messages.map((m) => (m._id === id ? data : m));
        this._cdr.detectChanges();
      },
      error: (err) => console.log(err),
    });
  }

  onDelete(id: string) {
    this._messageService.deleteMessage(id).subscribe({
      next: () => {
        this.messages = this.messages.filter((m) => m._id !== id);
        this._cdr.detectChanges();
      },
      error: (err) => console.log(err),
    });
  }
}
