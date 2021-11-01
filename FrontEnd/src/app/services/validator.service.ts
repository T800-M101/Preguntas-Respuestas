import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  passwordMatch(password:string, confirmPassword:string){


    return (formGroup:AbstractControl):ValidationErrors | null => {
      
      const pass1 = formGroup.get(password)?.value;
      const pass2 = formGroup.get(confirmPassword)?.value;

      if(pass1 !== pass2){
        formGroup.get(confirmPassword)?.setErrors({notMatch:true})
         return {notMatch:true} //1este el el objeto tipo ValidationErrors
      }

      formGroup.get(confirmPassword)?.setErrors(null);

      return null;
    }

  }
}
