import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../../models/usuario.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading:boolean = false;

  loginForm!:FormGroup;

  constructor(private fb:FormBuilder, private toastr: ToastrService, private router:Router) {
    this.loginForm = this.fb.group({
         usuario: ['', Validators.required],
         password: ['', Validators.required],
    });
   }

  ngOnInit(): void {
  }

  login():void{
    const usuario:Usuario = {
      nombreUsuario: this.loginForm.value.usuario,
      password: this.loginForm.value.password
    }
    
    this.loading = true;
    setTimeout( () => {


      if(usuario.nombreUsuario === 'memo' && usuario.password === 'admin123'){
        this.router.navigate(['/dashboard']);
     }else{
       this.toastr.error('Usuario o contraseña incorrecto', 'Error');
       this.loading = false;
       this.loginForm.reset();
     }

    },3000)
    

    

    
  }
  
  hasError(control:string):any{
    
    return this.loginForm.get(control)?.hasError('required') && this.loginForm.get(control)?.touched ? true : false;
  }
}
