import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent implements OnInit {

  form!:FormGroup;

  constructor(private formBuilder:FormBuilder, private validatorService:ValidatorService) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      oldPassword: ['', {
        validators:[Validators.required]
      }],

      newPassword: ['', {
        validators:[Validators.required, Validators.minLength(4)]
      }],

      confirmPassword:['']
    },{
      validators:[this.validatorService.passwordMatch('newPassword','confirmPassword')]
    });
  }


  cambiarPassword(){

  }

  getError(control:string){
    const oldPassword = this.form.get('oldPassword');
    const newPassword = this.form.get('newPassword');
    const confirmPassword = this.form.get('confirmPassword');
  
    if(control === 'oldPassword' && oldPassword?.hasError('required') && oldPassword?.touched){
      return 'La antigua contraseña es requerida.'
    }
  
    if(control === 'newPassword' && newPassword?.hasError('required') && newPassword?.touched){
      return 'La nueva contraseña es requerida.'
    }
  
    if(control === 'newPassword' && newPassword?.hasError('minlength') && newPassword?.touched){
      return 'La nueva contraseña debe tener mínimo 4 caracteres.'
    }
  
    if(control === 'confirmPassword' && confirmPassword?.hasError('notMatch') && confirmPassword?.touched){
      return 'Las contraseñas no coinciden.'
    }
  
  
    return '';
  }

}
