import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { LoginPanelComponent } from './loginPanel.component';
import { AuthService } from 'src/app/auth.service';
import { By } from '@angular/platform-browser';
import { Expression } from '@angular/compiler';
import { empty } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';


describe('LoginPanelComponent', () => {
  let component: LoginPanelComponent;
  let fixture: ComponentFixture<LoginPanelComponent>;
  let authService;
  let spy: any
  class RouterStub {
    url = '';
    navigate(commands: any[], extras?: any) { }
}
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPanelComponent ],
      providers: [AuthService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: []
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPanelComponent);
    component = fixture.componentInstance;
    // let authService = new AuthService();
    authService = TestBed.inject(AuthService);
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

  it('should give the error message if the Employee id field filed is empty', () => {
    
    const data = fixture.nativeElement;
    expect(data.querySelector('div > form > .span-container ').textContent).toBe('');
  })

  it('should call the login method on click of login button', () => {
    const buttonElement = fixture.debugElement.query(By.css('button'));
    const result = buttonElement.triggerEventHandler('click', component.login());
    expect(result).toBe()
  });

  it('should have valid credentials', () => {
    expect(component.crdentials.empid).toBe(123);
    expect(component.crdentials.password).toBe('admin')
  });

  it('form invalid when empty', () => {
    
    
      expect(component.reactiveForm.valid).toBeFalsy();
  
  });

  it('initial Employee ID field validity', () => {
    let email = component.reactiveForm.controls['empid']; (1)
    expect(email.valid).toBeFalsy(); 
  });

  it('initial password field validity', () => {
    let email = component.reactiveForm.controls['password']; (1)
    expect(email.valid).toBeFalsy(); 
  });

  it('invalid details', () => {
    component.reactiveForm.get('empid').setValue(12);
    component.reactiveForm.get('password').setValue('password');
    expect(component.invalidCondition()).toBeTrue()
  });

  it('call onClick function on submitting form', () => {
    spyOn(component,'onClick');
    // component.onSubmit();
    // expect(component.onClick).toHaveBeenCalled();
    spyOn(authService,'login')
    component.login();
    expect(authService.login).toHaveBeenCalled();
    fixture.detectChanges();
    // expect(true)
  });



});
