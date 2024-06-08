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

    // Tamaño manual del canvas
    //@ts-ignore
    const canvasWidth = this.returnCanvasSizes()[0];  // Ancho deseado del canvas
    //@ts-ignore
    const canvasHeight = this.returnCanvasSizes()[1]; // Alto deseado del canvas

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvasWidth, canvasHeight);
    container.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 1, 2000);
    camera.position.set(0, 600, 300);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x09090E);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.5);
    hemiLight.position.set(0, 200, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0x7BFDFBC, 1.5);
    dirLight.position.set(0, 200, 100);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 180;
    dirLight.shadow.camera.bottom = -100;
    dirLight.shadow.camera.left = -120;
    dirLight.shadow.camera.right = 120;
    scene.add(dirLight);

    // Model
    const loader = new FBXLoader();
    loader.load('../../assets/models/puffer.fbx', function (object: any) {
      const boundingBox = new THREE.Box3().setFromObject(object);
      const size = new THREE.Vector3();
      boundingBox.getSize(size);
      const center = new THREE.Vector3();
      boundingBox.getCenter(center);

      const modelSize = 10; // Adjust as needed
      const distance = modelSize / Math.tan(Math.PI * camera.fov / 360);
      camera.position.set(0, 0, distance);
      camera.lookAt(scene.position);

      // Ajustar la cámara para que se centre y se ajuste al tamaño del modelo
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = camera.fov * (Math.PI / 180);
      const cameraDistance = maxDim / Math.tan(fov / 2);

      camera.position.set(0, 0, cameraDistance + 100);
      camera.lookAt(center);

      camera.near = 0.1;
      camera.far = cameraDistance * 2;
      camera.updateProjectionMatrix();
      
      //Mover la chqueta sobre sobre su propio eje y su posición en general en el canvas
      object.rotation.x = Math.PI / 4; 
      object.position.set(-center.x , -center.y + 175, -center.z);

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

      transformControls.addEventListener('mouseDown', function () {
        mouseDownOnMesh = true;
        rotating = false;
        rotatingManually = true;
      });

      transformControls.addEventListener('mouseUp', function () {
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
    }, undefined, function (error: any) {
      console.error('An error happened', error);
    });
    
    window.addEventListener('resize', () => {onWindowResize(this)} );

    function onWindowResize(thisa:any) {
      //@ts-ignore
      const canvasWidth = thisa.returnCanvasSizes()[0];  
      //@ts-ignore
      const canvasHeight = thisa.returnCanvasSizes()[1];
      thisa.returnCanvasSizes();

        renderer.domElement.style.width = canvasWidth;
        renderer.domElement.style.height = canvasHeight;
      // renderer.domElement.style.zIndex = '0'
      //   renderer.domElement.style.top = '0'
      //   renderer.domElement.style.left = '0'

      const modelSize = thisa.returnModelSize(); // Adjust as needed
      const distance = modelSize / Math.tan(Math.PI * camera.fov / 360);
      camera.position.set(0, thisa.returnModelSize(), distance);
      
      // camera.lookAt(scene.position);

      camera.aspect = canvasWidth / canvasHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasWidth, canvasHeight);
      render();
    }

    function render() {
      renderer.render(scene, camera);
    }
  }

  returnCanvasSizes(){
    const width = Math.min(window.innerWidth, document.documentElement.clientWidth);
    if(width >= 320 && width < 768){
      return [320, 500];
    }else if(width >= 768 && width < 1440){
      return [768, 700];
    }else if(width >= 1440){
      return [1440, 900];
    }else{
      return null;
    }
  }

  returnModelSize(){
    const width = Math.min(window.innerWidth, document.documentElement.clientWidth);
    if(width >= 320 && width < 768){
      return 10;
    }else if(width >= 768 && width < 1440){
      return 80;
    }else if(width >= 1440){
      return 90;
    }else{
      return null;
    }
  }

}
