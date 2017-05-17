// ng dependencies
import { Injectable } from '@angular/core';

// custom services
import { ApiService } from './api.service';
import { StorageService } from './storage.service';

@Injectable()
export class UserService {
  constructor (private apiService: ApiService, private storageService: StorageService) {}

  login (credentials) {
    return this.apiService.post('api/login', {
      email: credentials.email,
      password: credentials.password
    });
  }
}
