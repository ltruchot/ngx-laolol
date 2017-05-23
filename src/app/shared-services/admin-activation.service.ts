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
    return this.apiService.get('isadmin/' + this.data.user.infos._id).map(success => {
      console.log('canActivate', success);
      return true;
    });
  //       .subscribe(success => {
  //       console.log(success);
  //     });
  //   }
  }
    // isAdmin (): Observable<boolean> {

  // }
}
