import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../services/models/User.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
 
  users:User[]=[{FirstName:'adminFirsttName',LastName:'adminLastName',email:'admin@admin',password:"admin123"},
                {FirstName:'Mahmood',LastName:'AbuAwwad',email:'abuawwadmahmood@gmail.com',password:"123123"}];
  page:number;   //1 login  2 sign up     3 dashboard 
  validForm:boolean;
  passwordIncorrect:boolean;
  emailIncorrect:boolean;
  emailFound:boolean;
  wrongPasswords:string;
  localStorageFirstName:string;
  localStorageLastName:string;
  constructor() {}
  ngOnInit(): void {
    // must handle reloading while logged in
    this.page=1;
    this.validForm=true;
    this.passwordIncorrect=false;
    this.emailIncorrect=false;
    this.emailFound=false;
    this.wrongPasswords='hidden';
  }
  onSubmitLogin(form:NgForm){ //handle the sign in operation --
    const email= form.form.value.email;
    const password= form.form.value.password;
    let LoginUser:User;
    this.emailIncorrect=false;
    this.passwordIncorrect=false;
    LoginUser=this.users.find (x=> x.email===email);
    if(LoginUser===undefined){
      this.emailIncorrect=true;
    } else{
      if(LoginUser.password!==password){
        this.passwordIncorrect=true;
      }
      else{ 
        localStorage.setItem('firstName',LoginUser.FirstName);
        localStorage.setItem('lastName',LoginUser.LastName);
        localStorage.setItem('email',LoginUser.email);
        this.page=3;
        this.localStorageFirstName=localStorage.getItem('firstName');
        this.localStorageLastName=localStorage.getItem('lastName');
      }
    }
  }
  navigateSignUp(){
    this.emailFound=false;
    this.wrongPasswords='hidden';
    this.page=2;
  }
  onSubmitSignUp(form:NgForm){
    //search first for email
    let flag=true;
    const FName= form.form.value.fname;
    const LName= form.form.value.lname;
    const email= form.form.value.email;
    const password= form.form.value.password;
    const RePassword= form.form.value.RePassword;
    if(password===RePassword){
      this.wrongPasswords='hidden';
      flag=true;
      for(let user1 of this.users){
        if(email===user1.email){
          this.emailFound=true;
          flag=false;
        }
      }
    }
    else{
      this.wrongPasswords='visible';
      flag=false;
    }
    if(flag===true){
      this.users.push({FirstName:FName,LastName:LName,email:email,password:password});
      this.page = 1;
    }
  }
  navigateLogin(){
    this.page=1;
    this.validForm=true;
    this.passwordIncorrect=false;
    this.emailIncorrect=false;
  }
  onClickLogOut(){
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('email');
    this.page=1;
  }
}

