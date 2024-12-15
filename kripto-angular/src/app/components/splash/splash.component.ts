import { AfterViewInit, Component } from '@angular/core';
import { HamMenuComponent } from '../ham-menu/ham-menu.component';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [HamMenuComponent, NgClass, NgIf ],
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.css'
})
export class SplashComponent implements AfterViewInit{
// export class SplashComponent implements AfterViewInit
  slide: boolean = false;
  // constructor(private window: Window) { }
  canvas!: HTMLCanvasElement

  toggleHam(){
    this.slide = true;
    if(window.outerWidth <= 768){
      document.body.style.touchAction = "none";
    }
  }

  ngAfterViewInit(): void {
    //@ts-ignore
    this.canvas = document.getElementById("splashCanvas");
    //@ts-ignore
    const father: HTMLElement = document.querySelector("app-splash");
    let width = father.offsetWidth;
    let height = father.offsetHeight;
    this.draw(width, height, this.returnCircleRadius(window.outerWidth))
    window.addEventListener('resize', (event: any) => {
      width = father.offsetWidth;
      height = father.offsetHeight;
      this.draw(width, height, this.returnCircleRadius(event.currentTarget.outerWidth))
    })
  }

  returnCircleRadius(windowWidth: number): number{
    if(windowWidth >= 320 && windowWidth < 768){
      return 90
    } else if(windowWidth >= 768){
      return 160
    } else{
      return 200
    }
  }

  draw(width: number, height: number, circleRadius: number){
    this.canvas.setAttribute('width', `${width}`)
    this.canvas.setAttribute('height', `${height}`)
    
    //@ts-ignore
    if (this.canvas.getContext) {
      //@ts-ignore
      const ctx = this.canvas.getContext("2d");
      //@ts-ignore
      //@ts-ignore
      ctx.fillStyle = 'rgba(144, 187, 118, 0.5)';
      //@ts-ignore
      
      ctx.beginPath();
      //@ts-ignore
      ctx.arc(width / 2,height / 2,circleRadius,0,2*Math.PI);
      //@ts-ignore
      ctx.fill();
    }
  }

  close(closeBool: boolean){
    console.log(closeBool)
    this.slide = !closeBool
  }
}
