// ng dependencies
import { Injectable } from '@angular/core';

// custom services
import { ApiService } from './api.service';
import { StorageService } from './storage.service';

@Injectable()
export class UserService {
  data = {
    isConnected: false,
    infos: null
  };
  constructor (private apiService: ApiService, private storageService: StorageService) {}

  login (credentials, cb?: Function) {
    this.apiService.post('api/login', {
      email: credentials.email,
      password: credentials.password
    }).subscribe(success => {
      if (success.token) {
        this.storageService.setItem('authToken', success.token);
        this.storageService.setItem('userInfos', success.user);
        this.data.isConnected = true;
        this.data.infos = success.user;
        if (typeof cb === 'function') {
          cb();
        }
      }
    });
  }

  logout (cb?: Function) {
    this.storageService.removeItem('authToken');
    this.storageService.removeItem('userInfos');
    this.data.isConnected = false;
    this.data.infos = null;
    if (typeof cb === 'function') {
      cb();
    }
  }
}
