import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
//@ts-ignore
import Stats from 'three/addons/libs/stats.module.js';
//@ts-ignore
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// @ts-ignore
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
  import * as THREE from 'three';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
  providers:[
    { provide: Window, useValue: window }
  ]
})

// export class AboutUsComponent implements AfterViewInit {
export class AboutUsComponent{
  constructor(private window:Window){

  }

  @ViewChild('div') divElement!: ElementRef;
  @ViewChild('h1') h1Element!: ElementRef;

  ngAfterViewInit(): void{
    let camera: any, scene: any, renderer: any, stats: any;

	const clock = new THREE.Clock();

	let mixer: any;

	const localThis = this

	//Crear canvas y ponerlo dentro del div del about-us
    const container = document.createElement( 'div' );
	this.divElement.nativeElement.appendChild( container );

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.set( 0, 100, 300 );

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xa0a0a0 );
	// scene.fog = new THREE.Fog( 0xa0a0a0, 200, 1000 );

	const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444, 5 );
	hemiLight.position.set( 0, 200, 0 );
	scene.add( hemiLight );

	const dirLight = new THREE.DirectionalLight( 0xffffff, 5 );
	dirLight.position.set( 0, 200, 100 );
	dirLight.castShadow = true;
	dirLight.shadow.camera.top = 180;
	dirLight.shadow.camera.bottom = - 100;
	dirLight.shadow.camera.left = - 120;
	dirLight.shadow.camera.right = 120;
	scene.add( dirLight );

	scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

	// ground
	const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
	mesh.rotation.x = - Math.PI / 2;
	mesh.receiveShadow = true;
	scene.add( mesh );

	// const grid = new THREE.GridHelper( 2000, 20, 0x000000, 0x000000 );
	// grid.material.opacity = 0.2;
	// grid.material.transparent = true;
	// scene.add( grid );

				// model
				const loader = new FBXLoader();
				loader.load( '../../assets/models/puffer.fbx', function ( object:any ) {

					// mixer = new THREE.AnimationMixer( object );

					// const action = mixer.clipAction( object.animations[ 0 ] );
					// action.play();

					object.traverse( function ( child:any ) {
						if ( child.isMesh ) {

							child.castShadow = true;
							child.receiveShadow = true;

						}

					} );

					scene.add( object );
					localThis.h1Element.nativeElement.style.display = 'none'
					//alert("loaded")

				} );

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.shadowMap.enabled = true;
				container.appendChild( renderer.domElement );

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.target.set( 0, 100, 0 );
				controls.update();

				window.addEventListener( 'resize', onWindowResize );

				// stats
				//stats = new Stats();
				//container.appendChild( stats.dom );
        animate()


        function onWindowResize() {

          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
  
          renderer.setSize( window.innerWidth, window.innerHeight );
		  render()
  
        }
  
        
  
        function animate() {
  
          requestAnimationFrame( animate );
  
          //const delta = clock.getDelta();
  
          //if ( mixer ) mixer.update( delta );

          render()
  
          //stats.update();
  
        }

		function render(){
			renderer.render( scene, camera );
		}
  }

}
