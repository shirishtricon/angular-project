import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { LoginPanelComponent } from './loginPanel.component';
import { AuthService } from 'src/app/auth.service';
import { By } from '@angular/platform-browser';


describe('LoginPanelComponent', () => {
  let component: LoginPanelComponent;
  let fixture: ComponentFixture<LoginPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPanelComponent ],
      providers: [AuthService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should set initial value of the newRole to empty', () => {
    expect(component.newRole).toBe('')
  });

  it('should display heading as  login depending on the role value from login component', () => {
    const data = fixture.nativeElement;
    expect(data.querySelector('div > form > h1').textContent).toContain(' Login')
  });

  it('should have login header requesting to enter the details', () => {    
    const data = fixture.nativeElement;
    expect(data.querySelector('p').textContent).toContain('Please enter your Employee ID and Password!')
  });

  it('should contain two input text boxes', () => {
    const inputBox = fixture.debugElement
    .queryAll(By.css('input'));
    expect(inputBox.length).toBe(2)
  });

  it('should have first input box heading as Employee ID', () => {
    const data = fixture.nativeElement;
    expect(data.querySelector('label').textContent).toContain('Employee ID')
  })

  it('should have second input box heading as Password', () => {
    const data = fixture.nativeElement;
    expect(data.querySelectorAll('label')[1].textContent).toContain('Password')
  });

  it('should contain a button', () => {
    const button = fixture.debugElement.queryAll(By.css('button'));
    expect(button.length).toBe(1);
  });

  it('should have the button name as Login', () => {
    const data = fixture.nativeElement;
    expect(data.querySelector('button').textContent).toBe('Login')
  });

  it('should call the login method on click of login button', () => {
    const buttonElement = fixture.debugElement.query(By.css('button'));
    const result = buttonElement.triggerEventHandler('click', component.login());
    expect(result).toBe()
  })

});
