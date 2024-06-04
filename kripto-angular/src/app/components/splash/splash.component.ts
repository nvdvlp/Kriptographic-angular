import { AfterViewChecked, AfterViewInit, Component } from '@angular/core';
import * as THREE from 'three';


@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [],
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.css'
})
// export class SplashComponent implements AfterViewInit{
export class SplashComponent{
  // constructor(private window: Window) { }

  // ngAfterViewInit(): void {
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

  

}
