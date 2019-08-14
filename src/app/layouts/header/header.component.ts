import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  @Output() clickMenuButton: EventEmitter<any>;
  headerAction = 1;
  constructor() {
    this.clickMenuButton = new EventEmitter();
  }

  ngOnInit() {
  }

  triggerBtn() {
    this.clickMenuButton.emit();
  }

}
