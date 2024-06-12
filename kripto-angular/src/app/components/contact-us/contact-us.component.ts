import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  userForm: FormGroup = this.fb.group({})

  arraySelect: any[] = [
    "Brand",
    "Studio",
    "Gamer"
  ]

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
