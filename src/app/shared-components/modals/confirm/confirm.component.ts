// ng dependencies
import { Component, OnInit } from '@angular/core';

// custom services
import { ModalService } from './../../../shared-services/modal.service';

// custom models
declare const $: any;

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './confirm.component.html'
})
export class ConfirmComponent implements OnInit {
  cpntData = {};

  constructor(private modalService: ModalService) { }

  ngOnInit() {}

  confirm () {
    if (typeof this.modalService.confirmMethod !== 'function') {
      return console.error('Confirm modal need a confirmMethod');
    }
    this.modalService.confirmMethod();
    $('#confirmModal').modal('hide');
  }
}
