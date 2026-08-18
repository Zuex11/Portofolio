import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Skillsdetails } from './skillsdetails';

describe('Skillsdetails', () => {
  let component: Skillsdetails;
  let fixture: ComponentFixture<Skillsdetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Skillsdetails],
    }).compileComponents();

    fixture = TestBed.createComponent(Skillsdetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
