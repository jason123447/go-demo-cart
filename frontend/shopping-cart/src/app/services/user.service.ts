import { Injectable } from '@angular/core';
import { User } from './data/models.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user?: User = {
    id: 2
  }
  constructor() { }
}
