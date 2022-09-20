import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  registrationForm= new FormGroup({
    userName : new FormControl('',[Validators.required,Validators.pattern(/^[a-z]{2,}$/)]),
    email : new FormControl('',[Validators.required,Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]),
    password : new FormControl('',[Validators.required,Validators.minLength(8)]),
  })

  get userName(){
    return this.registrationForm.get('userName')
  }
  get email(){
    return this.registrationForm.get('email')
  }
  get user(){
    return this.registrationForm.controls
  }
  get password(){
    return this.registrationForm.get('password')
  }
 
 
  onSubmit() {
    let user = {
      name:this.userName?.value,
      email:this.email?.value,
      
      password:this.password?.value
    }
    this.authService.register(user);
    this.router.navigate(['newsFeed'])
    console.log('hi client')
  }



}
