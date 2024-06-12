import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import emailjs,{ EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,],
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
    const { userEmail, templateName, userName, typeSelect } = this.userForm.value;
    emailjs.sendForm("service_kfofa1a", "template_mkkcsmy", this.userForm.value).then((result: EmailJSResponseStatus ) =>{
      console.log(result.text);
      alert('Email Send');   
    }, (error) =>{
      console.log(error.text);
      alert('email Failed')
    } );
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
