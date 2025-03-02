import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  standalone: false,
  templateUrl: './dynamic-page.component.html',
  styleUrl: './dynamic-page.component.css'
})
export class DynamicPageComponent {

  public myForm: FormGroup;
  public newFavorite: FormControl = new FormControl('', Validators.required );

  constructor( private fb: FormBuilder ) { 
    this.myForm = this.fb.group({ 
      name: ['', [ Validators.required, Validators.minLength(3) ]],
      favoriteGames: this.fb.array([
        ['Metal Gear', Validators.required ],
        ['Death Stranding', Validators.required ],
      ])
    });
  }

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  isValidFieldInArray( formArray: FormArray, index: number ) {
    return formArray.controls[index].errors
        && formArray.controls[index].touched;
  }

  getFieldError( field: string ): string | null {
    if ( !this.myForm.controls[field] ) return null;
    const errors = this.myForm.controls[field].errors || {};
    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracters.`;
      }
    }
    return null;
  }

  onAddToFavorites (): void {
    if ( this.newFavorite.invalid ) return;
    const newGame = this.newFavorite.value;

    this.favoriteGames.push(
      this.fb.control( newGame, Validators.required )
    );
    this.newFavorite.reset(); // resetea el input a su estado inicial
  }

  onDeleteFavorite( index: number ): void {
    this.favoriteGames.removeAt(index);
  }

  onSubmit():void {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value); 
    (this.myForm.get('favoriteGames') as FormArray).clear(); // borra favoriteGames array sin resetear el formulario entero
    // this.myForm.reset(); // Uncomment this line to reset the entire form

  }

}