import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  public isLoading = new BehaviorSubject(false);
  constructor() {}
  setLoader(visibility: boolean) {
    this.isLoading.next(visibility);
  }
  getLoader() {
    return this.isLoading.asObservable();
  }
}
