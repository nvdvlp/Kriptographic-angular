import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { CommonModule } from '@angular/common';
import { SplashComponent } from './components/splash/splash.component';
import { HamMenuComponent } from './components/ham-menu/ham-menu.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FormsModule } from '@angular/forms'; 

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
    HamMenuComponent
  ] ,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'kripto-angular';
}
