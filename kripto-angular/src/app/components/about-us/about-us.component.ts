import { Component, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
  providers: [
    { provide: Window, useValue: window }
  ]
})

// export class AboutUsComponent implements AfterViewInit {
export class AboutUsComponent {
  constructor(private window: Window) { }


}
