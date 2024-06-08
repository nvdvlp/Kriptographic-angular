import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  typeSelector = 'Brand';
  typeName = '';
  userName = '';
  email = '';
  terms = false;
  disapair = false;

  submit(typeName:String, userName:String, email:String){
    if(typeName === '' || userName === '' || email === ''){
      window.alert('Enter all fields');
    }else if(this.terms === false){
        window.alert('Accepts the Terms and Conditions');
    }else{
      this.disapair = true;
      setTimeout(() => {
        window.alert('submitted');
      }, 1000);
      }
  }
  
}
