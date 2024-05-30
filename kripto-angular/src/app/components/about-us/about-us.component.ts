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
    const width = window.innerWidth, height = window.innerHeight;

    // init
    
    const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
    camera.position.z = 1;
    
    const scene = new THREE.Scene();
    
    const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    const material = new THREE.MeshNormalMaterial();
    
    const mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );
    
    const renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( width, height );
    renderer.setAnimationLoop( animation );
    document.body.appendChild( renderer.domElement );
    
    // animation
    
    function animation( time:number ) {
    
      mesh.rotation.x = time / 2000;
      mesh.rotation.y = time / 1000;
    
      renderer.render( scene, camera );
    
    }

const loader = new GLTFLoader();

loader.load( '../../../assets/robot_rk11/scene.gltf', function ( gltf:any ) {

	scene.add( gltf.scene );

}, undefined, function ( error:any ) {

	console.error( error );

} );

}
}
