// ng dependencies
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html'
})
export class MultiselectComponent implements OnInit {
  @ViewChild('select') selectRef;
  @Input() id: Array<any>;
  @Input() list: Array<any>;
  @Input() title: string;
  @Input() displayedProp: string;
  @Output() onMultiselectChange: EventEmitter<any> = new EventEmitter();
  constructor() {
  }
  ngOnInit() {}

  onChangeOption(options: any): void {
    this.onMultiselectChange.emit(options);
  }

  updateSelectList(data: Array<string>) {
    // console.log('multiselect.component::updateSelectList', data);
    const options = this.selectRef.nativeElement.options;
    for (let i = 0; i < options.length; i++) {
      options[i].selected = data.indexOf(options[i].value) > -1;
    }
  }
}
