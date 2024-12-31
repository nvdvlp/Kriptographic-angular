import { AfterViewInit, ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { AppComponent } from '../../app.component';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [FormsModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent{

  constructor(private sanitizer: DomSanitizer){

  }
  cardArray: any[] = [
    {
      title: 'LICENSING NEGOTIATION',
      content: this.sanitizer.bypassSecurityTrustHtml('We help navigate brand licensing, securing rights to valuable intellectual property.<br /><br />From famous fashion houses to trendy labels, we ensure authenticity and enhance gameplay, enabling studios to create immersive <strong> virtual worlds</strong>')
    },
    {
      title: 'AI 3D ASSET CREATION',
      content: 'We turn brands into realistic data assets using advanced AI tecnology. Our 3d models of apparel and accesories replicate <strong>real-world products</strong>, offering lifelike visuales that enhacnes player innmersion.'
    },
    {
      title: 'GAMER INSIGHTS',
      content: 'Use consumer behavior data to customize gaming experiences based on player preferences. This approach helps make <strong>strategic decisions</strong>, ensuring branded content connects with gamers, boosts <strong>engagement</strong>, and builds lasting brand loyalty.'
    },
  ] 

  goRight(){
    // ultima carta al inicio
    const lastCard = this.cardArray.pop();
      if(lastCard){
        this.cardArray.unshift(lastCard);
        }  
    }
      
  goLeft(){
    // primera carta al final
    const firstCart = this.cardArray.shift();
      if(firstCart){
        this.cardArray.push(firstCart)
      }
    }
  }





