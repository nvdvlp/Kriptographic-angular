import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';


@Component({
  selector: 'app-ham-menu',
  standalone: true,
  imports: [ NgClass, NgIf],
  templateUrl: './ham-menu.component.html',
  styleUrl: './ham-menu.component.css'
})
export class HamMenuComponent {
  @Output() hideEvent = new EventEmitter<boolean>();

  close(){
    this.hideEvent.emit(true)
  }
}
