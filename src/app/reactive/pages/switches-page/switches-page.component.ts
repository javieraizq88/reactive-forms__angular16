import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
})
export class SwitchesPageComponent implements OnInit {

  public myForm: FormGroup;

  public person = {
    gender: 'F',
    wantNotifications: false,
  }

  constructor( private fb: FormBuilder ) {
    this.myForm =  this.fb.group({
      gender: ['M', Validators.required ],
      wantNotifications: [ true, Validators.required ],
      termsAndConditions: [ false, Validators.requiredTrue ],
    });
  }

  ngOnInit(): void {
    this.myForm.reset( this.person )
  }

  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  onSave() {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
    // muestra todas las propiedades de person EXCEPTO termsAndConditions  
    const { termsAndConditions, ...newPerson } = this.myForm.value;

    this.person = newPerson;
    // console.log(this.myForm.value);
    // console.log(this.person);

  }
}