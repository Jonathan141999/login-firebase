import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import {AuthenticationService} from '../services/authentication.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string ='';
  constructor(  
    private navCtrl: NavController,
    private authService:AuthenticationService,
    private formBuilder: FormBuilder
    ){

    }

  ngOnInit() {
    this.validations_form=this.formBuilder.group({
      email:new FormControl('',Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.+-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }

  validation_messages={
    'email':[
      {type:'required', message:'Email incorrecto'},
      {type:'pattern', message:'Por favor ingrese un email correcto'}
    ],
    'password':[
      {type:'required', message:'Contraseña incorrecta'},
      {type:'pattern', message:'Por favor ingrese una contraseña con 10 digitos'}
    ],
  };

  loginUser(value){
    this.authService.loginUser(value)
    .then(res=>{
        console.log('Respuesta de Ok',res);
        this.errorMessage='';
        this.navCtrl.navigateForward('/dashboard')
      }, err=>{
        this.errorMessage=err.message
      })
  }

  goToRegisterPage(){
    this.navCtrl.navigateForward('/register')
  }
}
