import { Component, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';


@Component({
  selector: 'app-ham-menu',
  standalone: true,
  imports: [ NgClass, NgIf],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './ham-menu.component.html',
  styleUrl: './ham-menu.component.css'
})
export class HamMenuComponent {
  @Output() hideEvent = new EventEmitter<boolean>();

  close(){
    if(window.outerWidth <= 768){
      document.body.style.touchAction = "auto";
    }
    this.hideEvent.emit(true)
  }
}
