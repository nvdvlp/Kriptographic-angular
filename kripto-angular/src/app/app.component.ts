import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { SplashComponent } from './components/splash/splash.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HamMenuComponent } from './components/ham-menu/ham-menu.component';
import { ServicesComponent } from './components/services/services.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    AboutUsComponent,
    SplashComponent,
    ContactUsComponent, 
    FormsModule,
    HamMenuComponent,
    ServicesComponent
  ] ,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'kripto-angular';
}
