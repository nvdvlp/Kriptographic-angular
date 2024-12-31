import { createClient } from '@supabase/supabase-js';
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Output } from '@angular/core';
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
  @Output() loaded = new EventEmitter<void>();
  private imagesToLoad = 2;
  private imagesLoaded = 0;

  
  arraySelect: any[] = [
    "Brand",
    "Studio",
    "Gamer"
  ]

  onImageLoad() {
    console.log("LOOOOOL")
    this.imagesLoaded++;
    console.log(this.imagesLoaded)
    console.log(this.imagesToLoad)
    if (this.imagesLoaded === this.imagesToLoad) {
      this.loaded.emit();
    }
  }

  userForm: FormGroup = this.fb.group({
    from_name: "Kriptogrhapic landing page",
    typeSelect: "",
    templateName: "",
    userName: "",
    userEmail: "",
  })  
  
  supabaseUrl: string = 'https://bcmpbgwpclcuojfmarpg.supabase.co';
  supabaseKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjbXBiZ3dwY2xjdW9qZm1hcnBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4MTgxOTcsImV4cCI6MjA0NzM5NDE5N30.lFnvAPkNj8eLO3rpGGNrEK1qXJoYqkCXv6Qn4N73388';
  supabase: any;
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
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: [''],
    })

    console.log(this.userForm)
  }

  onSubmit() {
    console.log('Form Submitted', this.userForm.value);
    this.addEmail(this.userForm.value.email,this.userForm.value.name);
  }


// Initialize the Supabase client

  async addEmail(email: string, name: string) {
  const { data, error } = await this.supabase
    .from('Emails') // Replace with your actual table name
    .insert([
      { email, name } // Replace with any other fields you want to populate
    ]);

  if (error) {
    console.error('Error inserting data:', error);
  } else {
    console.log('Data inserted successfully:', data);
  }
}

// Example usage

}
