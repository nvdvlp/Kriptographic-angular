import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import emailjs from 'emailjs-com';


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

  
  arraySelect: any[] = [
    "Brand",
    "Studio",
    "Gamer"
  ]

  userForm: FormGroup = this.fb.group({
    from_name: "Kriptogrhapic landing page",
    typeSelect: "",
    templateName: "",
    userName: "",
    userEmail: "",
  })  
   
  // async send(){
  //   console.log("a")
  //   //USER ID santiago
  //   emailjs.init("QPAQHaEGZSShP1t5v");
  //   let response = await emailjs.send("service_c8cgns1","template_37eq9wc",{
  //     from_name: this.userForm.value.from_name,
  //     typeSelect: this.userForm.value.typeSelect,
  //     templateName: this.userForm.value.templateName,
  //     userName: this.userForm.value.userName,
  //     userEmail:this.userForm.value.userEmail,
  //     });
  //     alert("message has been send");
  //     this.userForm.reset();
  // }

  ngOnInit(){
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: [''],
    })

    console.log(this.userForm)
  }

  onSubmit() {
    console.log('Form Submitted', this.userForm.value);
  }
}
