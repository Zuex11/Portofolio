import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Messagesdetails } from './messagesdetails';

describe('Messagesdetails', () => {
  let component: Messagesdetails;
  let fixture: ComponentFixture<Messagesdetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Messagesdetails],
    }).compileComponents();

    fixture = TestBed.createComponent(Messagesdetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
