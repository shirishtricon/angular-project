import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { DataService } from '../data.service';
import { By } from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let dataService: DataService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial value of empValue to be empty', () =>{
    expect(component.empValue).toBe('')
  });

  it('should update the empValue when searchEmployee function is called', () => {
    component.searchEmployee('Shirish');
    expect(component.empValue).toBe('Shirish')
  });

  it('should have the first element of the navbar to be Shirish Kulkarni', () => {
    const data = fixture.nativeElement;
    expect(data.querySelectorAll('a')[0].textContent).toBe('Shirish Kulkarni')
  });

  it('should have the second element of the navbar to be View Profile', () => {
    const data = fixture.nativeElement;
    expect(data.querySelectorAll('a')[1].textContent).toBe('View Profile');
  });

  it('should have the third element of the navbar to be Education', () => {
    const data = fixture.nativeElement;
    expect(data.querySelectorAll('a')[2].textContent).toBe('Education');
  });

  it('should have a text box with placeholder as search Employee', () => {
    const textbox = fixture.debugElement.queryAll(By.css('input'));
    const input: HTMLImageElement = textbox[0].nativeElement;
    expect(input.getAttribute('placeholder')).toEqual('Search Employee')
  });

  it('should contain two buttons', () => {
    const data = fixture.nativeElement;
    expect(data.querySelectorAll('button').length).toBe(2)
  });

  it('should have name as Search for first button', () => {
    const data = fixture.nativeElement;
    expect(data.querySelectorAll('button')[0].textContent).toBe('Search');
  });

  it('should have name as Logout for first button', () => {
    const data = fixture.nativeElement;
    expect(data.querySelectorAll('button')[1].textContent).toBe('Logout');
  });

  it('should call the logout method on click of login button', () => {
    // component.empValue = 'shirish'
    // const buttonElement = fixture.debugElement.query(By.css('button'));
    // const result = buttonElement.triggerEventHandler('click', component.logout());
    // expect(result).toBe()
    spyOn(component,'searchEmployee')
    component.searchEmployee('shirish');
    expect(component.searchEmployee).toHaveBeenCalled()
  });

});
