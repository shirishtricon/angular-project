import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FilterComponent } from './filter.component';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the label as Filter By: in p tag', () => {
    const data = fixture.nativeElement;
    expect(data.querySelector('p').textContent).toBe('Filter By:')
  });

  it('shouuld contain a button', () => {
    const button = fixture.debugElement.queryAll(By.css('button'));
    expect(button.length).toBe(1);
  });

  it('should have initial value of dropdown to be Designation', () => {
    const value = component.dropDownValue;
    expect(value).toBe('Designation')
  });

  it('should set the new designation value to value selected', () => {
    const selectedValue = {
      target : {
        innerHTML : 'Associate Software Engineer'
      }
    }
    component.onSelected(selectedValue);
    expect(component.dropDownValue).toBe('Associate Software Engineer');
  })
});
