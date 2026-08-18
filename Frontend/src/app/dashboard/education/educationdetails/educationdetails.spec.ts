import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Educationdetails } from './educationdetails';

describe('Educationdetails', () => {
  let component: Educationdetails;
  let fixture: ComponentFixture<Educationdetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Educationdetails],
    }).compileComponents();

    fixture = TestBed.createComponent(Educationdetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
