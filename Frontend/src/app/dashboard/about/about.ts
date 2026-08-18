import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AboutService } from '../../core/services/about-service';

@Component({
  selector: 'app-about',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit {
  constructor(
    private _aboutService: AboutService,
    private _cdr: ChangeDetectorRef,
  ) {}
  myForm!: FormGroup;
  status: string = '';

  ngOnInit(): void {
    this.myForm = new FormGroup({
      name: new FormControl(''),
      title: new FormControl(''),
      email: new FormControl(''),
      bio: new FormControl(''),
      github: new FormControl(''),
      linkedIn: new FormControl(''),
      photo: new FormControl<File | null>(null),
    });
    this._aboutService.getInfo().subscribe((data) => {
      if (data) {
        this.myForm.patchValue(data);
      }
    });
  }

  onSubmit() {
    let formData = new FormData();
    const photo = this.myForm.get('photo')?.value;
    formData.append('name', this.myForm.get('name')?.value as string);
    formData.append('title', this.myForm.get('title')?.value as string);
    formData.append('email', this.myForm.get('email')?.value as string);
    formData.append('bio', this.myForm.get('bio')?.value as string);
    formData.append('github', this.myForm.get('github')?.value as string);
    formData.append('linkedIn', this.myForm.get('linkedIn')?.value as string);
    if (photo) formData.append('photo', this.myForm.get('photo')?.value as File);
    this._aboutService.addInfo(formData).subscribe({
      next: (data) => {
        this.status = 'Success!';
        console.log(data);
        this._cdr.detectChanges();
      },
      error: (err) => {
        this.status = 'Failed';
        console.log(err);
        this._cdr.detectChanges();
      },
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({ photo: file });
    }
  }
}
