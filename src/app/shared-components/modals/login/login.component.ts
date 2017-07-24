// ng dependencies
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// npm dependencies
declare const $: any;

// custom services
import { UserService } from './../../../shared-services/user.service';

@Component({
  selector: 'app-modal-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  @ViewChild('loginModal') loginModal;
  loginForm: FormGroup;
  cpntData = {
    user: null
  };
  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    // init login form
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.cpntData.user = this.userService.data;
  }

  login ({ value, valid }) {
    if (valid) {
      this.userService.login(value, () => {
        $('#loginModal').modal('hide');
      });
    }
  }

  logout () {
    this.userService.logout(() => {
      $('#loginModal').modal('hide');
    });
  }

};
