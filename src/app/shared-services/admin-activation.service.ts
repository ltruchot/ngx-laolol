// ng dependencies
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
// npm dependencies
import { Observable } from 'rxjs/Rx';
// custom services
import { ApiService } from './api.service';
import { UserService } from './user.service';

@Injectable()
export class AdminActivationService implements CanActivate {
  data = {
    user: null
  };
  constructor(private userService: UserService, private apiService: ApiService) {
    this.data.user = this.userService.data;
  }

  canActivate(): Observable<boolean> {
    return this.apiService.getResources('api/isadmin', true).map(success => {
      console.log('canActivate', success);
      return true;
    });
  }
}
