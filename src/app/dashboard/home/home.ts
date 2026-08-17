import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Sidebar } from '../shared/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule, Sidebar, RouterOutlet,],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
