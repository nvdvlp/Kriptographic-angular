import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { AppComponent } from '../../app.component';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [AppComponent, FormsModule, CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements AfterViewInit{
  animacionActiva: boolean = false;
  tarjetaActiva: number = 1;

  cardArray: any[] = [
    {
      title: 'GAMER INSIGHTS',
      content: 'Harness the power of consumer behavior data to tailor gaming experiences to player preferences.This data-driven approach informs strategic decisions, ensuring that branded content resonates with gamers, drives engagement, and cultivates lasting brand affinity.'
    },
    {
      title: 'AI 3D ASSET CREATION',
      content: 'Transform brands into digital assets with unparalleled realism and detail. Leveraging cutting-edge AI technology, we meticulously craft 3D models of branded apparel and accessories. These assets replicate the aesthetic appeal of real-world products delivering lifelike visuals and enhancing player immersion.'
    },
    {
      title: 'LICENSING NEGOTIATION',
      content: 'Navigate the complexities of brand licensing with confidence, ensuring access to coveted intellectual property. From iconic fashion houses to trendsetting labels, we secure rights that enhance authenticity and enrich gameplay, empowering studios to create immersive virtual worlds.'
    },
  ]

  ngAfterViewInit() {
    const cardsNodeList = document.querySelectorAll('.services__showCard');
    let startingPosition = 20;
    let zIndexStartingPosition = cardsNodeList.length;
    cardsNodeList.forEach((card: any, index) => {
      card.style.zIndex = zIndexStartingPosition
      if(index > 0){
        card.style.top = `${startingPosition}px`
        startingPosition += 20
      } else{
        card.style.top = `0px`
      }
      zIndexStartingPosition -= 1;
    })
    //@ts-ignore
    document.querySelector('.services__cards').style.minHeight = `${425 + (20 * cardsNodeList.length)}px`
  }

  iniciarAnimacion() {
    this.animacionActiva = true;
    setTimeout(() =>{
      this.animacionActiva = false;
      this.cambiarTarjetaActiva(); 
    }, 2000); 
  }

  cambiarTarjetaActiva() {
    // pasa a la siguiente carta
    this.tarjetaActiva = this.tarjetaActiva % 3 + 1;
  }

} 


