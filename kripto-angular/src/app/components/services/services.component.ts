import { Component } from '@angular/core';
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
export class ServicesComponent{
  animacionActiva: boolean = false;
  tarjetaActiva: number = 1;

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


