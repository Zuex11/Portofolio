import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MessageService } from '../../../core/services/message-service';

@Component({
  selector: 'app-message',
  imports: [FormsModule],
  templateUrl: './message.html',
  styleUrl: './message.css',
})
export class Message {
  constructor(private _messageService: MessageService, private _cdr: ChangeDetectorRef) {}
  contact = { name: '', email: '', message: '' };
  contactStatus = '';
  sendMessage(myForm: NgForm) {
    this._messageService.addMessage(myForm.value).subscribe({
      next: (data) => {
        console.log(data);
        this.contactStatus = 'Success!';
        myForm.resetForm();
        this._cdr.detectChanges();
      },
      error: (err) => {
        this.contactStatus = 'Failed!';
        console.log(err);
        this._cdr.detectChanges();
      },
    });
  }
}

