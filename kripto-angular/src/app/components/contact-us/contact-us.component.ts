import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
declare var Email: any;

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  constructor(private fb: FormBuilder){
  }

  defaultUser = 'Brand';
  typeName = '';
  userName = '';
  email = '';
  terms = false;
  dissapear = false;
  EmailSended: any;
  userForm: FormGroup = this.fb.group({})

  arraySelect: any[] = [
    "Brand",
    "Studio",
    "Gamer"
  ]
  
  sendEmail() {
    if (this.userForm.valid) {
      const { userEmail, templateName, userName, typeSelect } = this.userForm.value;
      const emailBody = 
      `Nombre: ${userName}\n
      Empresa: ${templateName}\n
      Email: ${userEmail}\n
      Tipo: ${typeSelect}`;

      Email.send({
        Host: 'smtp.elasticemail.com', // Cambia esto a tu servidor SMTP
        Username: 'snieves056@domain.com', // Cambia esto a tu correo
        Password: 'Takamura346', // Cambia esto a tu contraseña
        To: 'kurathoo1@gmail.com', // Cambia esto al correo destino
        From: userEmail,
        Subject: 'new data form',
        Body: emailBody
      }).then((message:any) => {
        alert('Correo enviado exitosamente');
      }).catch((error:any) => {
        console.error('Error al enviar el correo:', error);
        alert('Ocurrió un error al enviar el correo');
      });
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }


  ngOnInit(){
    this.userForm = this.fb.group({
      userEmail: ['', [Validators.required, Validators.email]],
      templateName: ['', Validators.required],
      userName: ['', Validators.required],
      typeSelect: [this.defaultUser],
    })

    this.userForm.get('typeSelect')?.valueChanges.subscribe(value => {
      this.defaultUser = value;
    })

    console.log(this.userForm)
    
  }

  openLinkedin(){
    window.open('https://www.linkedin.com/company/mobilemetamarketing/' , '_blank')
  }
}
