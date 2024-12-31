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

  @Output() loaded = new EventEmitter<void>();

  imagesToLoad = 4; // Number of images in this component
  imagesLoaded = 0;

  onImageLoad() {
    this.imagesLoaded++;
    if (this.imagesLoaded === this.imagesToLoad) {
      this.loaded.emit(); // Emit event when all images are loaded
    }
  }

}
