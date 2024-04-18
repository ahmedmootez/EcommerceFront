import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  ngOnInit(): void {}

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  register(registerForm: NgForm) {
    console.log("aaaaaa")
    this.userService.register(registerForm.value).subscribe(
      (response: any) => {
        console.log(response)
        this.router.navigate(['/home']);
      },
      (error:HttpErrorResponse) => {
        if(error.status==200){
          this.router.navigate(['/home']);
        }
        
        console.log(error);
      }
    )
  }



}
