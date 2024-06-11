import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import * as THREE from 'three';
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
      console.log(event.currentTarget.outerWidth)
      width = father.offsetWidth;
      height = father.offsetHeight;
      this.draw(width, height, this.returnCircleRadius(event.currentTarget.outerWidth))
    })
  }

  returnCircleRadius(windowWidth: number): number{
    if(windowWidth >= 320 && windowWidth < 768){
      return 90
    } else if(windowWidth >= 768 && windowWidth < 1440){
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
      ctx.filter = 'blur(50px)'
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
  //   console.log("window.innerWidth")
  //   console.log(window.innerWidth)
  //   const scene = new THREE.Scene();
  //   const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  //   camera.position.z = 50;

  //   const renderer = new THREE.WebGLRenderer();
  //   renderer.setPixelRatio(window.devicePixelRatio);
  //   renderer.setSize(window.innerWidth, window.innerHeight);
  //   document.querySelector('app-splash')?.appendChild(renderer.domElement);

  //   //Estilar el renderer canvas
  //   renderer.domElement.style.position = 'absolute'
  //   renderer.domElement.style.zIndex = '0'
  //   renderer.domElement.style.top = '0'
  //   renderer.domElement.style.left = '0'

  //   const geometry = new THREE.SphereGeometry(15, 32, 16);
  //   const material = new THREE.MeshBasicMaterial({    
  //   color: 0x90BB76
  //   });
  //   const sphere = new THREE.Mesh(geometry, material);
  //   scene.add(sphere);

  //   const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
  //   scene.add( light );

  //   function animate() {
  //     requestAnimationFrame(animate);
    
  //     sphere.rotation.x += 0.002;
  //     sphere.rotation.y += 0.005;
    
  //     renderer.render(scene, camera);
  //   };

  //   animate();

  //   window.addEventListener('resize', (event) => [onWindowResize(event)], false);

  //   function onWindowResize(event: any) {
      
  //     const width = Math.min(window.innerWidth, document.documentElement.clientWidth);
  //     const height = Math.min(window.innerHeight, document.documentElement.clientHeight);
  //     setTimeout(() => {
  //       console.log("width")
  //       console.log(width)
  //     })
  //     camera.aspect = width / height;
  //     camera.updateProjectionMatrix();
  //     renderer.setSize(width, height);
  //     render();
  //   }

  //   function render() {
  //     renderer.render(scene, camera);
  //   }
  // }- CODIGO FUNCIONAL DE RESIZE EN THREE JS

  
  close(closeBool: boolean){
    console.log(closeBool)
    this.slide = !closeBool
  }
}
