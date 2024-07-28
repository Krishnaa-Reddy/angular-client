import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//TODO: Use this if needed
export class HelperService {

  public topic$$ = new Subject<string | undefined>();


}
