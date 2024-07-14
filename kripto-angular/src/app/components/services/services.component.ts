import { AfterViewInit, ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { AppComponent } from '../../app.component';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [AppComponent, FormsModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
  cardPosition: number = 0;
  cardsNodeList: any[] = [];
  cardsArray: any[] = []
  currentTitle: string = "";

  ngAfterViewInit() {
    this.currentTitle = this.cardArray[0].title
    const windowWidth = window.innerWidth
    //@ts-ignore
    this.cardsNodeList = document.querySelectorAll('.services__showCard');
    this.cardsNodeList.forEach((card: any, index) => {
      if(index > 0){
        card.classList.add('right')
      } else{
        card.classList.add('shown')
      }
    })
    this.addzIndexes()

    this.fillArrayFromNodeList()
  }

  addzIndexes(){
    let startingIndex = this.cardsNodeList.length - 1 
    this.cardsNodeList.forEach((card: any, index) => {
      card.style.zIndex = startingIndex
      startingIndex -=  1;
    })
  }

  fillArrayFromNodeList(){
    for (let i = 0; i < this.cardsNodeList.length; i++) {
      this.cardsArray.push(this.cardsNodeList[i])
    }
  }

  cardFromLeft: any;
  clicked: boolean = false;
  goRight(){
    if(this.clicked == false){
      console.log("clicked")
      this.clicked = true;
      const thisa = this;
      function handleRightAnimation(){
        thisa.fillArrayFromNodeList()
        thisa.shownCard = document.querySelector('.shown') 
        const nextIndex = thisa.cardsArray.indexOf(thisa.shownCard);
        thisa.cardFromLeft = thisa.cardsArray[nextIndex - 1]
        thisa.shownCard?.classList.add('right')
        thisa.shownCard?.classList.remove('goRight')
        thisa.shownCard?.classList.remove('left')
        thisa.shownCard?.classList.remove('shown')
    
        currentTitleCard?.classList.remove('dissapear')
        thisa.cardFromLeft.style.left = ''
        thisa.cardFromLeft.style.transform = ''
        thisa.cardFromLeft.classList.remove('right')
        thisa.cardFromLeft.classList.remove('left')
        thisa.cardFromLeft.classList.remove('goRight')
        thisa.cardFromLeft.classList.add('shown')
        thisa.currentTitle = thisa.cardArray[nextIndex - 1].title
        thisa.cardFromLeft.removeEventListener('animationend', handleRightAnimation)
        thisa.clicked = false;
      }
      
      this.shownCard = document.querySelector('.shown') 
      const nextIndex = this.cardsArray.indexOf(this.shownCard);
      const currentTitleCard = document.querySelector('.switcher')
      currentTitleCard?.classList.add('dissapear')
      this.cardFromLeft = this.cardsArray[nextIndex - 1]
      this.shownCard?.classList.add('goRight')
      this.cardFromLeft.classList.add('goRight')
      this.cardFromLeft.addEventListener('animationend', handleRightAnimation)
      
      this.cardPosition = nextIndex - 1;
    }
  }

  shownCard: any;
  cardFromRight: any;
  goLeft(){
    if(this.clicked == false){
      console.log("clicked")
      this.clicked = true;
      const thisa = this;
      function handleLeftAnimationEnd(){
        thisa.fillArrayFromNodeList()
        thisa.shownCard = document.querySelector('.shown') 
        const nextIndex = thisa.cardsArray.indexOf(thisa.shownCard);
        thisa.cardFromRight = thisa.cardsArray[nextIndex + 1]
        thisa.shownCard?.classList.add('left')
        thisa.shownCard?.classList.remove('goLeft')
        thisa.shownCard?.classList.remove('right')
        thisa.shownCard?.classList.remove('shown')
    
        currentTitleCard?.classList.remove('dissapear')
        thisa.cardFromRight.style.left = ''
        thisa.cardFromRight.style.transform = ''
        thisa.cardFromRight.classList.remove('right')
        thisa.cardFromRight.classList.remove('goLeft')
        thisa.cardFromRight.classList.add('shown')
        thisa.currentTitle = thisa.cardArray[nextIndex + 1].title
        thisa.clicked = false;
        thisa.cardFromRight.removeEventListener('animationend', handleLeftAnimationEnd)
      }

      this.shownCard = document.querySelector('.shown') 
      const nextIndex = this.cardsArray.indexOf(this.shownCard);
      const currentTitleCard = document.querySelector('.switcher')
      currentTitleCard?.classList.add('dissapear')
      this.cardFromRight = this.cardsArray[nextIndex + 1]
      this.shownCard?.classList.add('goLeft')
      this.cardFromRight.classList.add('goLeft')
      this.cardFromRight.addEventListener('animationend', handleLeftAnimationEnd)

      this.cardPosition = nextIndex + 1;
    }
  }

} 


