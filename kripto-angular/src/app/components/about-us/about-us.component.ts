import { Component, AfterViewInit } from '@angular/core';
import { AppComponent } from '../../app.component';
//@ts-ignore
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
  import * as THREE from 'three';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [AppComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
  providers:[
    { provide: Window, useValue: window }
  ]
})

export class AboutUsComponent implements AfterViewInit {
  constructor(private window:Window){

  }
  ngAfterViewInit(): void {

    //renderer
    const renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(0xffffff);
    renderer.setPixelRatio(window.devicePixelRatio);

    document.body.appendChild(renderer.domElement);
    

    //scene & camera
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(4, 5, 11);


    //geometry
    const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
    groundGeometry.rotateX(-Math.PI / 2);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color:0x555555,
      side:THREE.DoubleSide
    })
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    scene.add(groundMesh);

    // animate
    function animate(){
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();
    
    //loader
    const loader = new GLTFLoader().setPath('../../../assets/robot_rk11/');
    loader.load('scene.gltf', (gltf: any) => {
      const mesh = gltf.scene;
      mesh.position.set(0, 1.05, -1);
      scene.add(mesh);
    }, undefined, (error: any) => {
      console.error('An error happened', error);
    });
    
  }


}
