import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent  {

  dropDownValue: string ="Designation" ;

  constructor(private dataService: DataService){ }

  onSelected(value:any){
    //  = value
    console.log(typeof value);
    this.dropDownValue = value.target.innerHTML;
    this.dataService.sendMessage(this.dropDownValue);
    console.log(this.dropDownValue);
    
  }

  
}
