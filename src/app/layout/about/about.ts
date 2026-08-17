import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AboutService } from '../../core/services/about-service';

@Component({
  selector: 'app-about',
  imports: [CommonModule, FormsModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit {
  about = {
    name: 'Your Name',
    title: 'Your Role / Title',
    bio: 'Write a short bio here...',
    photo: '',
    email: 'you@example.com',
    github: '#',
    linkedIn: '#',
  };
  contact = { name: '', email: '', message: '' };
  contactStatus = '';
  sendMessage() {
    console.log(this.contact);
  }
  constructor(private _aboutService: AboutService, private _cdr:ChangeDetectorRef) {}
  ngOnInit(): void {
    this._aboutService.getInfo().subscribe((data) => {
      this.about = data;
      this._cdr.detectChanges();
    });
  }
}
