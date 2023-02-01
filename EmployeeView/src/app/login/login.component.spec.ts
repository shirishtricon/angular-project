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

  it('should have a logo with alt value as Tricon logo', () => {
    const img = fixture.debugElement
    .queryAll(By.css('img'));
    const altValue: HTMLImageElement = img[0].nativeElement;
    expect(altValue.alt).toBe('Tricon logo')
  })

  it('should have title Tricon Infotech Pvt Ltd', () => {    
    const data = fixture.nativeElement;
    expect(data.querySelector('.login-container > div > h1').textContent).toContain('Tricon Infotech Private Limited')
  });

  it('should have login title as Lgoin as', () => {    
    const data = fixture.nativeElement;
    expect(data.querySelector('.login-container > div > h2').textContent).toContain('Login as')
  }); 
  
  it('should contain two buttons', () => {
    const buttons = fixture.debugElement
    .queryAll(By.css('button'));
    expect(buttons.length = 2).toBeTruthy()
  });

  it('should have button name as HR for first button', () => {
    const buttons = fixture.debugElement
    .queryAll(By.css('button'));
    const firstButton: HTMLButtonElement = buttons[0].nativeElement;
    expect(firstButton.textContent).toBe('HR');
  });

  it('should have button name as Manager for first button', () => {
    const buttons = fixture.debugElement
    .queryAll(By.css('button'));
    const firstButton: HTMLButtonElement = buttons[1].nativeElement;
    expect(firstButton.textContent).toBe('Manager');
  });

  it('should contain initial role value to be empty', () => {
    expect(component.role).toBe('');
  });

  it('should set role value to HR on clicking the HR button', () => {
    component.hrClick();
    expect(component.role).toBe('HR');
  });
  it('should set role value to Manager on clicking the HR button', () => {
    component.managerClick();
    expect(component.role).toBe('Manager');
  });
});
