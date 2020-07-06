import { Injectable, OnInit } from '@angular/core';
import { User } from './User.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService implements OnInit{

  users:User[]=[{FirstName:'adminFirsttName',LastName:'adminLastName',email:'admin@admin',password:"admin123"}];
  constructor() { }
  ngOnInit(): void {
  }


  addUSer(user:User){
    this.users.push(user);
  }
  getUsers(){
    return this.users;
  }

  
  
}
