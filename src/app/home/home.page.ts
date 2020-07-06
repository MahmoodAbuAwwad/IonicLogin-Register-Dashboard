import { UsersService } from '../services/models/users.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../services/models/User.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
 
  users:User[]=[];
  Login:boolean;
  validForm:boolean;
  passwordIncorrect:boolean;
  emailIncorrect:boolean;
  emailFound:boolean;
  wrongPasswords:string;

   STORAGE={user:User};
  constructor(private usersService:UsersService) {}

  ngOnInit(): void {
    this.Login=true;
    this.validForm=true;
    this.users=this.usersService.getUsers();  //preferd to be subscibred than return a list :(
    this.passwordIncorrect=false;
    this.emailIncorrect=false;
    this.emailFound=false;
    this.wrongPasswords='hidden';


  }
  
  onSubmitLogin(form:NgForm){ //handle the sign in operation --
    this.users=this.usersService.getUsers();
    const email= form.form.value.email;
    const password= form.form.value.password;
    // console.log(email +' '+ password)

    for(let user of this.users){ //validate if user is registered inside my dummy ata
      if(user.email===email){
        this.emailIncorrect=false;
        if(user.password===password){
          this.passwordIncorrect=false;
          
            //save data to local storage
        }
        else{
          this.passwordIncorrect=true;
        }
      }
      else{
        this.emailIncorrect=true;
      }
    }

  }

  navigateSignUp(){
    this.emailFound=false;
    this.wrongPasswords='hidden';
    this.Login=false;
    this.users=this.usersService.getUsers();

  }





  onSubmitSignUp(form:NgForm){
    this.users=this.usersService.getUsers();
    //search first for email
    const firstName= form.form.value.fname;
    const lastName= form.form.value.lname;
    const email= form.form.value.email;
    const password= form.form.value.password;
    const RePassword= form.form.value.RePassword;
    if(password===RePassword){
      this.wrongPasswords='hidden';

      for(let user1 of this.users){
        if(email===user1.email){
          this.emailFound=true;
        }
        else{
          this.emailFound=false;
          //do the sign Up
          console.log('fname'+firstName + '  lname'+lastName + '  em  '+email );
        }
      }
    }
    else{
      this.wrongPasswords='visible';

    }
  }
  navigateLogin(){
    this.Login=true;
    this.validForm=true;
    this.users=this.usersService.getUsers();
    this.passwordIncorrect=false;
    this.emailIncorrect=false;

  }
}
