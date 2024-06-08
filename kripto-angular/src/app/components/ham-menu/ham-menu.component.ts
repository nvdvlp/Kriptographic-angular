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
  @Input() showMenu: boolean = true;
  @Output() closeMenu = new EventEmitter<void>();

  close() {
    console.log("cerrar")
    setTimeout(() => {
        this.showMenu = false;
    }, 300)
  }
}
