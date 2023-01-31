import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  SharedData: string;

  private _filterMessageSource = new Subject<string>();
  filterMessage$ = this._filterMessageSource.asObservable();
  constructor() { }

  sendMessage(message: string){
    this._filterMessageSource.next(message)
  }
}
