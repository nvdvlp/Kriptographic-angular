import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { SplashComponent } from './components/splash/splash.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HamMenuComponent } from './components/ham-menu/ham-menu.component';
import { ServicesComponent } from './components/services/services.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { LoaderComponent } from './components/loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    AboutUsComponent,
    SplashComponent,
    ContactUsComponent, 
    FormsModule,
    ServicesComponent,
  ] ,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Kriptographic';
  showLoader: boolean = true;
  fontLoaded: boolean = false;

  ngOnInit(): void {
    document.addEventListener('DOMContentLoaded', () => {
      const sections = document.querySelectorAll('.section');
      const navLinks = document.querySelectorAll('.nav-item');
  
      function highlightCurrentSection() {
          let currentSectionId = '';
          sections.forEach((section) => {
            //@ts-ignore
            const sectionTop = section.offsetTop - 50; // Adjust offset if needed
            //@ts-ignore
            const sectionHeight = section.offsetHeight;
            //@ts-ignore
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
              //@ts-ignore
              currentSectionId = section.getAttribute('id');
            }
          });
          
          navLinks.forEach((link) => {
            //@ts-ignore
              if (link.getAttribute('href').substring(1) === currentSectionId) {
                  link.classList.add('active');
              } else {
                  link.classList.remove('active');
              }
          });
      }
  
      window.addEventListener('scroll', highlightCurrentSection);
  });
  }
}
