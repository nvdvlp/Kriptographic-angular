import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { CommonModule } from '@angular/common';
import { SplashComponent } from './components/splash/splash.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AboutUsComponent, SplashComponent, ContactUsComponent] ,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'kripto-angular';
}
