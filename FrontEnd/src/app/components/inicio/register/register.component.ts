//import { getParseErrors } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/services/validator.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!:FormGroup;
  

  constructor(private formBuilder:FormBuilder, private validatorService:ValidatorService) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      usuario: ['', {
        validators:[Validators.required]
      }],
      
      password:['',{
        validators:[Validators.required, Validators.minLength(4)]
      }],
      
      confirmPassword:['']

    },{
      validators:[this.validatorService.passwordMatch('password','confirmPassword')]
    });
}



getError(control:string):string{
      
  const usuario = this.form.get('usuario');
  const password = this.form.get('password');
  const confirmPassword = this.form.get('confirmPassword');

  if(control === 'usuario' && usuario?.hasError('required') && usuario?.touched){
    return 'El usuario es requerido.'
  }

  if(control === 'password' && password?.hasError('required') && password?.touched){
    return 'La contraseña es requerida.'
  }

  if(control === 'password' && password?.hasError('minlength') && password?.touched){
    return 'La contraseña debe tener mínimo 4 caracteres.'
  }

  if(control === 'confirmPassword' && confirmPassword?.hasError('notMatch') && confirmPassword?.touched){
    return 'Las contraseñas no coinciden.'
  }


  return '';
}



registerUser():void{
   console.log(this.form);
}





}
