import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('testing title', () => {
    // let data = fixture.debugElement;
    // expect(data.query(By.css('.login-container > div > h1')).nativeElement.textContent).toContain('Tricon Infotech Private Limited');
    const data = fixture.nativeElement;
    expect(data.querySelector('.login-container > div > h1').textContent).toContain('Tricon Infotech Private Limited')
  })
});
