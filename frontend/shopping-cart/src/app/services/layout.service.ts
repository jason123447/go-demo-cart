import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  set appLoading(bool: boolean) {
    Promise.resolve().then(_ => {
      this._appLoading = bool;
    });
  }

  get appLoading() {
    return this._appLoading;
  }

  private _appLoading = false;
  constructor() { }
}
