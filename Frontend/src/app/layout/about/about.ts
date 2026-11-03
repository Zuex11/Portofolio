import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AboutService } from '../../core/services/about-service';
import { IAboutAPI } from '../../core/services/models/about.model';
import { Skills } from '../skills/skills';
import { Projects } from '../projects/projects';

@Component({
  selector: 'app-about',
  imports: [CommonModule, RouterLink, Skills, Projects],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit {
  about :IAboutAPI = {
    _id: '',
    name: 'Your Name',
    title: 'Your Role / Title',
    bio: 'Write a short bio here...',
    photo: '',
    email: 'you@example.com',
    github: '#',
    linkedIn: '#',
  };
 

  constructor(private _aboutService: AboutService, private _cdr:ChangeDetectorRef) {}
  ngOnInit(): void {
    this._aboutService.getInfo().subscribe((data) => {
      this.about = data;
      this._cdr.detectChanges();
    });
  }
}
