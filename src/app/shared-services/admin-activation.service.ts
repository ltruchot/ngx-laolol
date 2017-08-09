// ng dependencies
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// npm dependencies
// import { Observable } from 'rxjs/Observable';

// custom services
import { ApiService } from './api.service';
import { UserService } from './user.service';

@Injectable()
export class AdminActivationService implements CanActivate {
  data = {
    user: null
  };
  constructor(private userService: UserService,
    private apiService: ApiService,
    private router: Router) {
    this.data.user = this.userService.data;
  }

  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.apiService.getResources('api/isadmin', true).subscribe(success => {
        if (!success) {
          this.router.navigate(['home']);
        }
        resolve(!!success);
      }, error => {
        console.error('canActivate Error:', error);
        this.userService.logout();
        resolve(false);
        this.router.navigate(['home']);
      });
    });
  }
}
