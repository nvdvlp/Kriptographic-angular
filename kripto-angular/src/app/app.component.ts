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
    RouterOutlet,
    AboutUsComponent,
    SplashComponent,
    ContactUsComponent, 
    FormsModule,
    HamMenuComponent,
    ServicesComponent,
    LoaderComponent
  ] ,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Kriptographic';
  showLoader: boolean = true;
  fontLoaded: boolean = false;
  gifLoaded: boolean = false;

  ngOnInit(): void {
    const font = new FontFace('Medium', 'url(assets/fonts/Medium/medium.otf)');
    const thisa = this;

    const interval = setInterval((): any => {
      if(this.fontLoaded && this.gifLoaded){
        this.showLoader = false;
        console.log("closed interval")
        clearInterval(interval)
      }
    }, 0o5)
    // Load the font
    font.load().then(function(loadedFont) {
      // @ts-ignore
      document.fonts.add(loadedFont);
    
      thisa.fontLoaded = true
      if(thisa.fontLoaded && thisa.gifLoaded){
        thisa.showLoader = false;
      }
    }).catch(function(error) {
      console.error('Font failed to load:', error);
    });
  }

  checkLoads(){
    this.gifLoaded = true;
    if(this.fontLoaded && this.gifLoaded){
      this.showLoader = false;
    }
  }
}
