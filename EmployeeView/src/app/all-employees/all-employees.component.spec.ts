import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AllEmployeesComponent } from './all-employees.component';
import { DataService } from '../data.service';


describe('AllEmployeesComponent', () => {
  let component: AllEmployeesComponent;
  let fixture: ComponentFixture<AllEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllEmployeesComponent ],
      providers: [DataService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have', () => {
    expect(component.newCriteria).toBe('')
  });

  it('should have the view type as card', () => {
    const data = fixture.nativeElement;
    expect(data.querySelector('.card')).toBeTruthy()
  });

  it('should have the card title', () => {
    const data = fixture.nativeElement;
    expect(data.querySelector('h5').textContent).toBe(component.allEmployees[0].name)
  });

  it('should have the first p element to be Employee ID', () => {
    const data = fixture.nativeElement;
    expect(data.querySelectorAll('p')[0].textContent).toBe(`Employee ID: ${component.allEmployees[0].emp_id}`)
  });

  it('should have the second p element to be Designation', () => {
    const data = fixture.nativeElement;
    expect(data.querySelectorAll('p')[1].textContent).toBe(`Designation: ${component.allEmployees[0].designation}`)
  });

  it('should have the third p element to be Experience', () => {
    const data = fixture.nativeElement;
    expect(data.querySelectorAll('p')[2].textContent).toBe(`Experience: ${component.allEmployees[0].experience} Years`)
  });

  it('should have the fourth p element to be Skill', () => {
    const data = fixture.nativeElement;
    expect(data.querySelectorAll('p')[3].textContent).toBe(`Skill: ${component.allEmployees[0].skills}`)
  });

  it('should have the Employee array', () => {
    expect(typeof(component.allEmployees)).toBe('object')
  });

  it('should have initial filteredEmployees as same as allEmployees', () => {
    expect(component.allEmployees).toEqual(component.filteredEmployees)
  });

  it('should have the button inside the card named View Details', () => {
    const data = fixture.nativeElement;
    expect(data.querySelector('button').textContent).toBe('View Details');
  });

  it('should not display error message initially', () => {
    const data = fixture.nativeElement;
    expect(data.querySelector('ng-template')).toBeNull()
  })
  
});
