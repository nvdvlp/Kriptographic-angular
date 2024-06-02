import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
//@ts-ignore
import Stats from 'three/addons/libs/stats.module.js';
//@ts-ignore
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//@ts-ignore
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
//@ts-ignore
import * as THREE from 'three';
//@ts-ignore
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
  providers: [
    { provide: Window, useValue: window }
  ]
})
export class AboutUsComponent implements AfterViewInit {
  constructor(private window: Window) { }

  @ViewChild('div') divElement!: ElementRef;
  @ViewChild('h1') h1Element!: ElementRef;

  ngAfterViewInit(): void {
    let camera: any, scene: any, renderer: any, controls: any;
    let transformControls: any;
    let rotating = true;
    let mouseDownOnMesh = false;
    const localThis = this;

    // Crear canvas y ponerlo dentro del div del about-us
    const container = document.createElement('div');
    this.divElement.nativeElement.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.set(0, 150, 300);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x09090E);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 5);
    hemiLight.position.set(0, 200, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 5);
    dirLight.position.set(0, 200, 100);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 180;
    dirLight.shadow.camera.bottom = -100;
    dirLight.shadow.camera.left = -120;
    dirLight.shadow.camera.right = 120;

    scene.add(dirLight);	
	
    // scene.add(new THREE.CameraHelper(dirLight.shadow.camera));
	
    // Ground
    // const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }));
    // mesh.rotation.x = -Math.PI / 2;
    // mesh.receiveShadow = true;
    // scene.add(mesh);

    // Model
    const loader = new FBXLoader();
    loader.load('../../assets/models/puffer.fbx', function (object: any) {
		
		const boundingBox = new THREE.Box3().setFromObject(object);
		const size = new THREE.Vector3();
		boundingBox.getSize(size);

		// Configurar el tamaño del canvas
		renderer.setSize(size.x, size.y);
		console.log("Ancho del modelo:", size.x);
		console.log("Alto del modelo:", size.y);

		const aspectRatio = size.x / size.y;
		console.log("Proporción del modelo:", aspectRatio);

      object.traverse(function (child: any) {
        if (child.isMesh) {
		  child.material.flatShading = true; 
          child.material.wireframe = true; 	
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      scene.add(object);
      localThis.h1Element.nativeElement.style.display = 'none';

	// TransformControls
	transformControls = new TransformControls(camera, renderer.domElement);
	transformControls.attach(object);
	transformControls.setMode('rotate');
	scene.add(transformControls);
	let rotatingManually = false;

	transformControls.showX = false; 
	transformControls.showY = false; 
	transformControls.showZ = false; 

	transformControls.addEventListener('mousedown', function () {
		mouseDownOnMesh = true;
		rotating = false; 
		rotatingManually = true;
	});
	
	transformControls.addEventListener('mouseup', function () {
		mouseDownOnMesh = false;
		rotating = !rotatingManually; 
		rotatingManually = false; 
	});
	
	renderer.domElement.addEventListener('mouseleave', function () {
		if (rotatingManually) {
			rotatingManually = false;
			rotating = true;
		}
	});

      function animate() {
        requestAnimationFrame(animate);

        if (rotating && !mouseDownOnMesh) {
          object.rotation.y += 0.009;
        }

        render();
      }

      function render() {
        renderer.render(scene, camera);
      }

      animate();
    });

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // controls = new OrbitControls(camera, renderer.domElement);
    // controls.target.set(0, 100, 0);
    // controls.update();

    window.addEventListener('resize', onWindowResize);

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      render();
    }

    function render() {
      renderer.render(scene, camera);
    }
  }
}