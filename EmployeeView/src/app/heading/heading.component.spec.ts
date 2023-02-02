import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadingComponent } from './heading.component';

describe('HeadingComponent', () => {
  let component: HeadingComponent;
  let fixture: ComponentFixture<HeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the heading as All Employees', () => {
    const heading = fixture.nativeElement;
    expect(heading.querySelector('h1').textContent).toBe('All Employees');
  })
});
